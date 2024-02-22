import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <section>
     
        <div className="container m-auto  ">
          <div className="flex justify-between p-8 sticky items-center">
            <div>
              <Image src="/homePageImages/logo.svg" width={200} height={200} alt="logo" />
            </div>
            <div className=" py-2 px-10 bg-green-500 rounded-lg">
            <Link href="/signup">
              <button>Login</button>
              </Link>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Navbar;
