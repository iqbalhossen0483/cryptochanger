import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <section>
        <h3>ABOUT US</h3>
        <div className='footer-menus'>
          <Link href='terms'>
            <a>Terms of Services</a>
          </Link>
          <Link href='privacy'>
            <a>Privacy Policy</a>
          </Link>
          <Link href='about'>
            <a>About us</a>
          </Link>
        </div>
      </section>
      <section>
        <h3>HELP & CONTACT</h3>
        <div className='footer-menus'>
          <Link href='faq'>
            <a>FAQ</a>
          </Link>
          <Link href='contact'>
            <a>Contacts</a>
          </Link>
        </div>
      </section>
      <section>
        <h3>MORE FROM US</h3>
        <div className='footer-menus'>
          <Link href='News'>
            <a>News</a>
          </Link>
          <Link href='siteMap'>
            <a>Site Map</a>
          </Link>
          <Link href='reviews'>
            <a>Customer Reviews</a>
          </Link>
          <Link href='discount'>
            <a>Discount System</a>
          </Link>
          <Link href='affiliate'>
            <a>Affiliate Program</a>
          </Link>
        </div>
      </section>
      <section>
        <h3>ACCOUNT</h3>
        <div className='footer-menus'>
          <Link href='account'>
            <a>Manage Account</a>
          </Link>
          <Link href='login'>
            <a>Login</a>
          </Link>
          <Link href='register'>
            <a>Register</a>
          </Link>
          <Link href='myExchanges'>
            <a>My Exchanges</a>
          </Link>
        </div>
      </section>
      <section className='social-icons'>
        <h3>FOLLOW US ON</h3>
        <i className='fa-brands fa-facebook text-blue-600'></i>
        <i className='fa-brands fa-youtube text-red-500'></i>
        <i className='fa-brands fa-linkedin text-blue-900'></i>
      </section>

      <div className='col-span-5 text-center'>
        <p>
          Copyright © 2021 Crypto Exchanger All Right Reserved, Design By{" "}
          <a
            href='https://iqbalhossen-c5422.web.app/'
            target='_blank'
            className='text-[#0d6363] font-medium cursor-pointer'
            rel='noreferrer'
          >
            Md Iqbal Hossen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
