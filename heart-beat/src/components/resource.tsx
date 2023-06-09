import Link from 'next/link';


const Resource = () => {
  return (
<div className="bg-white pt-10 pb-16 lg:px-20 px-4 text-black grid grid-cols-1 md:grid-cols-4 gap-8">
  <div className="link-hover">
    <h3 className="font-bold text-2xl mb-3 h3-underline">About</h3>
    <p>Learn more about HeartBeat and our mission to connect nurses and employers.</p>
    <Link href="/about">Read more</Link>
  </div>
  <div className="link-hover">
    <h3 className="font-bold text-2xl mb-3 h3-underline">Blog</h3>
    <p>Read our latest posts and stay updated on industry trends and news.</p>
    <Link className="link-hover" href="/blog">Read more</Link>
  </div>
  <div className="link-hover">
    <h3 className="font-bold text-2xl mb-3 h3-underline">Contact</h3>
    <p>Have questions or want to get in touch with us? We&apos;d love to hear from you.</p>
    <Link className="link-hover" href="/contact">Contact us</Link>
  </div>
  <div className="link-hover">
    <h3 className="font-bold text-2xl mb-3 h3-underline">Help</h3>
    <p>Need assistance with HeartBeat? Visit our Help Center for support and information.</p>
    <Link className="link-hover" href="/help">Visit Help Center</Link>
  </div>
</div>




  );
};

export default Resource;
