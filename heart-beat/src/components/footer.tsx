import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="bg-background py-3 mt-auto">
      <div className=" flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-primary hover:text-primary-light" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-primary hover:text-primary-light" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-primary hover:text-primary-light" />
            </a>
            <a href="mailto:contact@example.com">
              <FaEnvelope className="text-primary hover:text-primary-light" />
            </a>
          </div>
          <div className="mt-2 text-gray-600">
            <p>© {new Date().getFullYear()} HeartBeat</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
