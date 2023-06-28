import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer w-full rounded-t-3xl">
      <div className="rounded-t-3xl bg-orange-500 bg-opacity-90 px-10 pt-7 shadow-[0_0_30px_0px_rgba(179,80,5,1)]">
        <div className="mx-auto max-w-8xl">
          <div className="flex justify-between">
            <div className="w-full">
              <Link href="/">
                <Image
                  width={200}
                  height={200}
                  src="/konangkonang2.png"
                  alt="KonangKonang Logo"
                />
              </Link>
              <p className="mt-2 text-main-white">©2022, @KonangKonang.</p>
            </div>

            <div className="my-3 mt-5 h-full w-full text-right">
              <h2 className="mb-2 font-poppins text-2xl font-bold text-main-white underline decoration-1 underline-offset-4">
                FOLLOW US
              </h2>
              <div className="mx-2 mt-1 flex justify-end">
                <Link
                  className="mx-2 "
                  href="https://www.instagram.com/komipa.ugm/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={45}
                    height={45}
                    src="/iglogo.svg"
                    alt="Instagram"
                  />
                </Link>

                <Link
                  className="mx-2 mt-[1px]"
                  href="https://twitter.com/mipaugm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={45}
                    height={45}
                    src="/twtlogo.svg"
                    alt="Twitter"
                  />
                </Link>
              </div>
            </div>

            <div className="my-3 mt-5 mr-3 w-full text-right text-main-white">
              <h2 className="font-poppins text-2xl font-bold underline decoration-1 underline-offset-4">
                MENUS
              </h2>
              <ul className="space-y-1">
                <li className="font-inder text-xl">
                  <a href="#Recommendations">
                    <span className="hover:underline">Recommendations</span>
                  </a>
                </li>
                <li className="font-inder text-xl">
                  <a href="#Categories">
                    <span className="hover:underline">Categories</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="my-3 mt-5 mr-3 w-full text-right text-main-white">
              <h2 className="font-poppins text-2xl font-bold underline decoration-1 underline-offset-4">
                KOMIPA
              </h2>
              <ul className="space-y-1">
                <li className="font-inder text-xl">
                  <a href="#">
                    <span className="hover:underline">Home</span>
                  </a>
                </li>
                <li className="font-inder text-xl">
                  <a href="#">
                    <span className="hover:underline">About Us</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="mx-auto mt-6 border-main-white" />
          <div className="py-1">
            <p className="text-center font-poppins font-medium text-main-white">
              Made with love ♡
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
