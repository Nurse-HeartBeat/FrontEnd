import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-10">
      <div className="flex justify-center">
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-blue-700" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-700" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-blue-700" />
          </a>
          <a href="mailto:contact@example.com">
            <FaEnvelope className="hover:text-blue-700" />
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-2 text-gray-600">
        <p>© {new Date().getFullYear()} HeartBeat</p>
      </div>
    </footer>
  );
};

export default Footer;
