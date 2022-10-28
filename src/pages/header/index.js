import React from "react";

function Index({ title, icon }) {
  return (
    <div className="title">
      {icon}
      {title}
    </div>
  );
}

export default Index;
