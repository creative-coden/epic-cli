module.exports = function (name) {
    return `import React, { ReactElement } from 'react';
import Helmet from 'react-helmet';

import favicon from '@assets/icons/favicon.ico';

export function Head(): ReactElement {
  return (
    <Helmet>
      <meta name="title" content="${name}" />
      <meta name="description" content="Fresh new app" />
      <meta name="keywords" content="social media, productivity" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="12 days" />
      <meta name="author" content="Creative type" />
      <link rel="icon" type="image/ico" sizes="16x16" href={favicon} />
      <title>${name}</title>
    </Helmet>
  );
}
`
};
