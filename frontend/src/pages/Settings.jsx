import { useEffect, useState } from "react";

function Settings() {
  const [ footer, setFooter ] = useState('');
  const [ mastodon, setMastodon ] = useState('');
  const [ matrix, setMatrix ] = useState('');
  const [ xmpp, setXmpp ] = useState('');
  const [ email, setEmail ] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/settings');
      const json = await response.json();

      if(response.ok) {
        setFooter(json.footer || '');
        setMastodon(json.mastodon || '');
        setMatrix(json.matrix || '');
        setXmpp(json.xmpp || '');
        setEmail(json.email || '');
      }
    }

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    if (isLoading) return;
  
    setIsLoading(true);
    e.preventDefault();

    const response = await fetch(`/api/settings`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          footer,
          mastodon,
          matrix,
          xmpp,
          email,
          token: localStorage.getItem('token'),
        }),
      });

      if(response.ok) {
        setIsLoading(false);
      }

    setIsLoading(false);
  }

  return (
    <div className="flex-grow flex justify-center">
      <main className="max-w-xl w-full px-6 sm:px-16 pt-16 pb-10">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between items-center font-semibold text-xl border-b-2 border-gray-200 pb-2 mb-6 text-gray-600">
              <h2>تنظیمات عمومی</h2>
            </div>
            <input className="block bg-gray-300 px-4 py-2 rounded-full focus:outline outline-2 outline-purple-600 w-full" placeholder="متن فوتر" onChange={(e) => setFooter(e.target.value)} value={footer} />
            <div className="flex justify-between items-center font-semibold text-xl border-b-2 border-gray-200 pb-2 mt-6 mb-6 text-gray-600">
              <h2>شبکه های اجتماعی</h2>
            </div>
            <input dir="ltr" className="block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" placeholder="Mastodon" onChange={(e) => setMastodon(e.target.value)} value={mastodon} />
            <input dir="ltr" className="mt-6 block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" placeholder="Matrix" onChange={(e) => setMatrix(e.target.value)} value={matrix} />
            <input dir="ltr" className="mt-6 block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" placeholder="Xmpp" onChange={(e) => setXmpp(e.target.value)} value={xmpp} />
            <input dir="ltr" className="mt-6 block bg-gray-300 px-4 py-2 rounded-full text-left focus:outline outline-2 outline-purple-600 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="flex justify-center mt-6 mb-6">
            <button className="block bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-white hover:text-purple-600 border-2 border-purple-600 transform hover:scale-125 transition ease-out duration-300" type="submit">{isLoading ? 'لطفا منتظر بمانید...' : 'ثبت تغییرات'}</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Settings;
