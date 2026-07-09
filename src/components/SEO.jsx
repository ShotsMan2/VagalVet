import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  const defaultTitle = "VagalVet - Profesyonel Veteriner Kliniği";
  const defaultDescription = "Dostlarınız için şefkatli, modern ve profesyonel veterinerlik hizmetleri. 7/24 acil servis, aşı takvimi, cerrahi ve laboratuvar.";
  const defaultKeywords = "veteriner, hayvan hastanesi, kedi aşısı, köpek aşısı, acil veteriner, pet klinik, vagalvet";

  return (
    <Helmet>
      <title>{title ? `${title} | VagalVet` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} | VagalVet` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content="/logo.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title ? `${title} | VagalVet` : defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content="/logo.png" />
      
      {/* ARIA & Accessibility Hints */}
      <html lang="tr" />
    </Helmet>
  );
};

export default SEO;
