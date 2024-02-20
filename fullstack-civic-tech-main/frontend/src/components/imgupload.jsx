import React from 'react';
import * as LR from '@uploadcare/blocks';

const UploadcareComponent = () => {
  LR.registerBlocks(LR);
  return (
    <lr-file-uploader-minimal
      css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.32.0/web/lr-file-uploader-minimal.min.css"
      ctx-name="my-uploader"
      class="my-config"
    ></lr-file-uploader-minimal>
  );
};
export default UploadcareComponent;
