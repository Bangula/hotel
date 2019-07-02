import React from "react";

const Map = () => {
  return (
    <div className="w-full mt-32">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.779289706252!2d20.900138215785528!3d44.005288337609194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4757211a385cd97d%3A0x954fc66e4e527eed!2sQuantox+Technology!5e0!3m2!1sen!2srs!4v1561727680253!5m2!1sen!2srs"
        frameBorder="0"
        style={{ border: "none", width: "100%", height: "50vh" }}
        allowFullScreen
      />
    </div>
  );
};

export default Map;
