import React from 'react';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';

const Spinner = () => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PropagateLoader color="#007bff" css={override} size={15} />
    </div>
  );
}

export default Spinner;
