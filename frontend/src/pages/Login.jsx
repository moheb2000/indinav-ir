import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const handleSubmit = async (e) => {
    if (isLoading) return;
  
    setIsLoading(true);
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/api/authers/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();

      if(response.ok) {
        if(json.token) {
          localStorage.setItem('token', json.token);
          setIsLoading(false);
          setRedirect(true);
        }
      } else {
        setError(json.error);
      }

    setIsLoading(false);
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-xl w-full px-6 sm:px-16 pt-16 pb-10">
        {redirect ? <Navigate to={'/'} /> : null}
        <form onSubmit={handleSubmit}>
          <input dir="ltr" className="block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input dir="ltr" className="mt-6 block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" type="password" placeholder="Password" onChange={(p) => setPassword(p.target.value)} value={password} />
          <div className="flex justify-center mt-6">
            <button className="block bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-purple-600 border-2 border-purple-600 transform hover:scale-125 transition ease-out duration-300" type="submit">{isLoading ? 'لطفا منتظر بمانید...' : 'ورود به حساب کاربری'}</button>
          </div>
          <div className={error === '' ? "hidden" : ""}>
            <div className="rounded border border-red-600 text-red-600 px-4 py-2 mt-6">
              {error}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
