import Link from "next/link";
import Image from "next/image";

const logo = "";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image
            src="https://static.vecteezy.com/ti/vecteur-libre/p3/17395533-vecteur-editorial-du-logo-disney-gratuit-vectoriel.jpg"
            alt="Disney Logo"
            width={90}
            height={50}
          />
        </Link>
      </div>
      <div className="account-info"></div>
    </div>
  );
};

export default NavBar;
