import React from "react";
import {
  OfficeBuildingIcon,
  LogoutIcon,
  CogIcon,
  MailIcon,
  NewspaperIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  UserIcon,
  MenuAlt1Icon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Button from "./Button";

function NavBar(props) {
  return (
    <nav className="flex justify-between items-center h-20 bg-black">
      <div className="ml-10">
        <NavBarBrand color="white">
          <Link href="/">Aestus</Link>
        </NavBarBrand>
      </div>
      <div className="flex items-center mr-20"><Link href="/"><div className="text-white m-5">Humidity</div></Link><Link href="/pressure"><div className="text-white m-5">Pressure</div></Link><Link href="/precipitation"><div className="text-white m-5">Precipitation</div></Link></div>
    </nav>
  );
}

function NavBarBrand(props) {
  const classes = `
  text-2xl text-${props.color ? props.color : "black"} text-bold mr-10
  `;
  return <div className={classes}>{props.children}</div>;
}

export default NavBar;
