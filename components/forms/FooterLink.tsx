import Link from "next/link";
import React from "react";

const FooterLink = ({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-200">{text}</p>
      <Link href={href} className="footer-link">
        {linkText}
      </Link>
    </div>
  );
};

export default FooterLink;
