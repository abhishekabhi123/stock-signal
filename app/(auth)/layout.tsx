import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout ">
      <section className="auth-left-section scrollbar-hide-default mt-10">
        <Link href="/" className="auth-log">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            className="h-8 w-auto"
            width={140}
            height={32}
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote>
            Singnalist turned my watchlist into a winning list. The alerts are
            spot-on, and I feel more confident making more moves in the market.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">-Ethan R.</cite>
              <p className="max-md:text-xs text-gray-500">Retail investor</p>
            </div>
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((star) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  key={star}
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <Image
            src="/assets/images/dashboard.png"
            alt="dashboard"
            height={1150}
            width={1440}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  );
};

export default layout;
