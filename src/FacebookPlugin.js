import React from 'react';

const FacebookPlugin = () => {
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Felkimagic%2F&amp;tabs=timeline&amp;width=340&amp;height=500&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=false&amp;appId"
        title="Nuestra facebook!"
        style={{
          position: 'absolute',
          top: '170%',
          left: '5000%',
          width: '5000%',
          height: '100%',
          border: 'none',
          overflow: 'hidden'
        }}
        scrolling="no"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    </div>
  );
};

export default FacebookPlugin;