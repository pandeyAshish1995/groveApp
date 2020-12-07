import React from "react";
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import HeaderComponent from "../components/HeaderComponent"
class StripsScreen extends React.Component {
  state = { data: [], selectedColorValue: null };
  componentDidMount = async () => {
    let data = [
      {
        id: "1",
        name: "Total Hardness",
        unit: "ppm",
        values: [
          { color: "rgb(45,91,142)", value: "0" },
          { color: "rgb(89,100,146)", value: "110" },
          { color: "rgb(97,88,138)", value: "250" },
          { color: "rgb(118,75,119)", value: "500" },
          { color: "rgb(152,81,130)", value: "1000" }
        ]
      },
      {
        id: "2",
        name: "Total Chlorine",
        unit: "ppm",
        values: [
          { color: "rgb(255,240,108)", value: "0" },
          { color: "rgb(245,248,127)", value: "1" },
          { color: "rgb(223,235,111)", value: "3" },
          { color: "rgb(166,203,158)", value: "5" },
          { color: "rgb(134,192,154)", value: "10" }
        ]
      },
      {
        id: "3",
        name: "Free Chlorine",
        unit: "ppm",
        values: [
          { color: "rgb(254,240,156)", value: "0" },
          { color: "rgb(230,217,201)", value: "1" },
          { color: "rgb(177,146,184)", value: "3" },
          { color: "rgb(150,103,159)", value: "5" },
          { color: "rgb(119,62,129)", value: "10" }
        ]
      },
      {
        id: "4",
        name: "pH",
        unit: "ppm",
        values: [
          { color: "rgb(211,145,75)", value: "6.2" },
          { color: "rgb(236,119,62)", value: "6.8" },
          { color: "rgb(208,85,42)", value: "7.2" },
          { color: "rgb(206,82,74)", value: "7.8" },
          { color: "rgb(214,50,71)", value: "8.4" }
        ]
      },
      {
        id: "5",
        name: "Total Alkalinity",
        unit: "ppm",
        values: [
          { color: "rgb(210,158,74)", value: "0" },
          { color: "rgb(159,150,79)", value: "40" },
          { color: "rgb(104,129,111)", value: "120" },
          { color: "rgb(54,112,103)", value: "180" },
          { color: "rgb(53,106,115)", value: "240" }
        ]
      },
      {
        id: "6",
        name: "Cyanuric Acid",
        unit: "ppm",
        values: [
          { color: "rgb(197,137,68)", value: "0" },
          { color: "rgb(191,104,46)", value: "50" },
          { color: "rgb(175,69,77)", value: "100" },
          { color: "rgb(144,39,92)", value: "150" },
          { color: "rgb(132,46,119)", value: "300" }
        ]
      },
      {
        id: "7",
        name: "Cyanuric Acid",
        unit: "ppm",
        values: [
          { color: "rgb(197,137,68)", value: "0" },
          { color: "rgb(191,104,46)", value: "50" },
          { color: "rgb(175,69,77)", value: "100" },
          { color: "rgb(144,39,92)", value: "150" },
          { color: "rgb(132,46,119)", value: "300" }
        ]
      }
    ];
    this.setState({ data });
  };
  componentWillUnmount() {}

  inputHandle = (text, id, values) => {
    let value = text;
    let { selectedColorValue, selectedColor } = this.setMinValue({ id, values, inputValue: value });
    console.log("selectedColorValue, selectedColor", selectedColorValue, selectedColor);
    setTimeout(() => {
      this.setState({
        [`input_${id}`]: value,
        [`selectedValue_${id}`]: selectedColorValue,
        [`selectedColor_${id}`]: selectedColor
      });
    }, 0);
  };
  selectColor = ({ colorData, id }) => {
    let { value, color } = colorData;
    this.setState({
      [`input_${id}`]: value,
      [`selectedValue_${id}`]: value,
      [`selectedColor_${id}`]: color
    });
  };
  setMinValue = ({ id, values, inputValue }) => {
    let selectedColorValue = void 0;
    let selectedColor = void 0;
    console.log("values", values, inputValue);
    let isEqualValue = values.findIndex((x, index) => {
      if (inputValue == Number(x.value)) {
        selectedColorValue = x.value;
        selectedColor = x.color;
        return true;
      }
    });
    if (isEqualValue > -1 && values[isEqualValue]) {
      console.log("values[isEqualValue]", values[isEqualValue]);
      return { selectedColorValue, selectedColor };
    } else if (inputValue > Number(values[values.length - 1].value)) {
      selectedColorValue = values[values.length - 1].value;
      selectedColor = values[values.length - 1].color;
      return { selectedColorValue, selectedColor };
    } else {
      for (let i = 0; i < 4; i++) {
        let { value, color } = values[i] || {};
        let { value: valueNext, color: colorNext } = values[i + 1] || {};
        if (inputValue > Number(value) && inputValue < Number(valueNext)) {
          selectedColorValue = value;
          selectedColor = color;
          break;
        }
      }
      return { selectedColorValue, selectedColor };
    }
  };
  renderItem = ({ id, name, values = [], unit }, key) => {
    return (
      <View style={{ flexDirection: "row", flex: 1 }} key={key}>
        {values && values.length ? (
          <View
            style={{
              marginRight: 10,
              marginLeft: 5,
              borderWidth: 1,
              borderColor: "#80808047",
              borderBottomColor:  key != this.state.data.length-1? "transparent": "#80808047",
              borderTopColor: key != 0 ? "transparent" : "#80808047",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{ backgroundColor: this.state[`selectedColor_${id}`] || values[0].color, width: 25, height: 20 }}
            />
          </View>
        ) : null}
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 12, alignItems: "center" }}>{`${name} (${unit})`}</Text>

            <TextInput
              style={{
                width: 60,
                alignItems: "center",
                height: 30,
                fontSize: 7,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#80808047"
              }}
              name={`${name}`}
              value={this.state[`input_${id}`] || 0}
              placeholder={"0"}
              keyboardType="numeric"
              onChangeText={text => this.inputHandle(text, id, values)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            {values.map((colorData, index) => {
              let { color, value } = colorData || {};
              let colorInput = this.state[`selectedValue_${id}`];
              return (
                <View
                  key={index}
                  style={{
                    marginLeft: index != 0 ? 10 : 0,
                    marginTop: 10,
                    marginBottom: 15
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.selectColor({ colorData, id })}
                    style={{
                      backgroundColor: `${color}`,
                      width: 55,
                      height: 25,
                      borderRadius: 4,
                      borderWidth: 3,
                      borderColor: colorInput == value ? "#51ed51" : "transparent"
                    }}
                  />
                  <Text style={{ textAlign: "center", paddingTop: 5 }}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };
  render() {
    let { data = [] } = this.state;
    //     return <ScrollView style={{borderWidth:1,borderColor:"red"}}>
    // <Text>"kkk</Text>
    //     </ScrollView>
    return (
      <>
      <HeaderComponent title={"Test Strip"} titleColor={"#0e2e65"} showAvtar={false}/>
      <ScrollView style={{ margin: 10,flex:1 }}>
        {data && data.length
          ? data.map((x, index) => {
              return this.renderItem(x, index);
            })
          : null}
      </ScrollView>
      </>
    );
  }
}

export default StripsScreen;
