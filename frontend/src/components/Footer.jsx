import { useEffect, useState } from "react";

function Footer() {
  const [ footer, setFooter ] = useState('');
  const [ mastodon, setMastodon ] = useState('');
  const [ matrix, setMatrix ] = useState('');
  const [ xmpp, setXmpp ] = useState('');
  const [ email, setEmail ] = useState('');

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

  return (
    <div>
      <footer className="bg-white text-gray-700 py-10 px-2 flex justify-center">
        <div>
          <p className="text-center">{footer}</p>
          <div className="flex justify-center mt-2">
          <a href="/feed.xml">
              <div className="w-6 hover:text-orange-600 transform hover:scale-125 transition ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rss" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                </svg>
              </div>
            </a>
            <a className={mastodon ? "" : "hidden"} href={mastodon}>
              <div className="w-6 mr-2 hover:text-purple-600 transform hover:scale-125 transition ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-mastodon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18.648 15.254c-1.816 1.763 -6.648 1.626 -6.648 1.626a18.262 18.262 0 0 1 -3.288 -.256c1.127 1.985 4.12 2.81 8.982 2.475c-1.945 2.013 -13.598 5.257 -13.668 -7.636l-.026 -1.154c0 -3.036 .023 -4.115 1.352 -5.633c1.671 -1.91 6.648 -1.666 6.648 -1.666s4.977 -.243 6.648 1.667c1.329 1.518 1.352 2.597 1.352 5.633s-.456 4.074 -1.352 4.944z"></path>
                  <path d="M12 11.204v-2.926c0 -1.258 -.895 -2.278 -2 -2.278s-2 1.02 -2 2.278v4.722m4 -4.722c0 -1.258 .895 -2.278 2 -2.278s2 1.02 2 2.278v4.722"></path>
                </svg>
              </div>
            </a>
            <a className={matrix ? "" : "hidden"} href={`https://matrix.to/#/${matrix}`}>
              <div className="w-6 mr-2 hover:text-black transform hover:scale-125 transition ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-matrix" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 3h-1v18h1"></path>
                  <path d="M20 21h1v-18h-1"></path>
                  <path d="M7 9v6"></path>
                  <path d="M12 15v-3.5a2.5 2.5 0 1 0 -5 0v.5"></path>
                  <path d="M17 15v-3.5a2.5 2.5 0 1 0 -5 0v.5"></path>
                </svg>
              </div>
            </a>
            <a className={xmpp ? "" : "hidden"} href={`xmpp:${xmpp}?message`}>
              <div className="w-6 mr-2 hover:text-green-600 transform hover:scale-125 transition ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M8 9h8"></path>
                  <path d="M8 13h6"></path>
                  <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
                </svg>
              </div>
            </a>
            <a className={email ? "" : "hidden"} href={`mailto:${email}`}>
              <div className="w-6 mr-2 hover:text-red-600 transform hover:scale-125 transition ease-out duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                  <path d="M3 7l9 6l9 -6"></path>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
