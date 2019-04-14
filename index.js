import React, { Component } from "react";
import vCard from "vcard-json";
import jsonexport from "jsonexport";
import fs from "fs";
import {
  render,
  Window,
  Spinbox,
  App,
  Dialog,
  Button,
  ProgressBar,
  Menu,
  Grid,
  Group,
  Form,
  TextInput,
  Box,
  Text,
  StyledText,
  Area
} from "proton-native";

class CSVApp extends Component {
  state = { loading: false };

  // save() {
  //   const filename = Dialog("Save");
  //   if (filename) {
  //     fs.writeFileSync(filename, this.state.text);
  //   }
  // }

  open() {
    var data;
    const filename = Dialog("Open");
    console.log(filename);
    if (filename) {
      /* Use readFile() if the file is on disk. */
      vCard.parseVcardFile(filename, function(err, json) {
        jsonexport(json, function(err, csv) {
          if (err) return console.log(err);

          // write to a new file named 2pac.txt
          fs.writeFile(`${filename}.csv`, csv, err => {
            // throws an error, you could also catch it here
            if (err) throw err;
            data = csv;
            // success case, the file was saved
            Dialog("Message", {
              title: "Success",
              description: "Your file has been converted!"
            });
            require("child_process").exec(`start "" "${filename}.csv"`);
          });
        });
      });
      this.setState({ text: data });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextState.text === "string") return false;
    // nextState is set from input
    else return true; // nextState is set from file
  }

  render() {
    return (
      <App onShouldQuit={() => console.log("Quitting")}>
        <Menu label="File">
          <Menu.Item type="Item" onClick={() => this.open()}>
            Open
          </Menu.Item>
          <Menu.Item type="Quit" />
        </Menu>
        <Window
          onClose={() => console.log("Closing")}
          title="VCF to CSV Converter"
          size={{ w: 500, h: 500 }}
          margined
        >
          <Group>
            <Box>
              <Area stroke="red" strokeWidth="10">
                <Area.Text style={{ fontSize: 20 }}>
                  Welcome to VCF to Excel{" "}
                  <Area.Text
                    style={{
                      color: "red",
                      fontSize: 10,
                      fontWeight: "bold"
                    }}
                  >
                    FREE!
                  </Area.Text>
                </Area.Text>
              </Area>

              <Button onClick={() => this.open()}>Select VCF File</Button>
            </Box>
          </Group>
        </Window>
      </App>
    );
  }
}

render(<CSVApp />);
