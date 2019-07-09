import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { createNewCapmpaign } from "@endpoints/subscribe";

const NewCampaign = ({ Alert }) => {
  const [subject, setSubject] = useState("");
  const [template, setTemplate] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await createNewCapmpaign({
      subject,
      html: template
    });
    if (data) {
      console.log(data.data);
      Alert.success(<i className="fas fa-check" />, {
        effect: "slide",
        timeout: 2000,
        position: "bottom-right"
      });
    } else if (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <h1 className="text-gray-600 text-center text-xl italic my-8">
        Create and send new campaign to subscribers
      </h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-name"
          fullWidth
          label="Subject"
          className=""
          onChange={e => setSubject(e.target.value)}
        />
        <TextField
          id="standard-name"
          multiline
          fullWidth
          label="Paste HTML here"
          className="mt-8"
          style={{ marginTop: "60px" }}
          onChange={e => setTemplate(e.target.value)}
        />
        <br />
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "30px" }}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;
