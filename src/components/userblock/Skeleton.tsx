import ContentLoader from "react-content-loader"
import React from 'react';

type skeletonProps = {
    props: any
  }
const Skeleton: React.FC<skeletonProps> = (props) => {
    return (
        <ContentLoader 
        speed={2}
        width={400}
        height={260}
        viewBox="0 0 400 260"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="116" rx="3" ry="3" width="114" height="10" /> 
        <circle cx="54" cy="54" r="54" /> 
        <rect x="47" y="184" rx="0" ry="0" width="65" height="19" /> 
        <rect x="-1" y="185" rx="0" ry="0" width="37" height="15" /> 
        <rect x="0" y="138" rx="0" ry="0" width="114" height="38" />
      </ContentLoader>
    );
};

export default Skeleton;