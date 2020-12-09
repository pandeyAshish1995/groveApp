import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, StyleSheet } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { fetchStrips } from "../redux/actions/StripAction";
import color from "../styles/colors";

class StripsScreen extends React.Component {
  state = { data: [] };
  componentDidMount = () => {
    this.props.getData();
  };
  componentWillUnmount() {}

  inputHandle = (text, id, values) => {
    let value = text;
    let { selectedColorValue, selectedColor } = this.setMinValue({ id, values, inputValue: value });
    this.setState({
      [`input_${id}`]: value,
      [`selectedValue_${id}`]: selectedColorValue,
      [`selectedColor_${id}`]: selectedColor
    });
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
    let isEqualValue = values.findIndex((x, index) => {
      if (inputValue == Number(x.value)) {
        selectedColorValue = x.value;
        selectedColor = x.color;
        return true;
      }
    });
    if (isEqualValue > -1 && values[isEqualValue]) {
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
              borderBottomColor: key != this.state.data.length - 1 ? "transparent" : "#80808047",
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
                paddingTop:0,
                paddingBottom:0,
                fontSize: 13,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#80808047"
              }}
              name={`${name}`}
              value={this.state[`input_${id}`] || ""}
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
    const { stripData = [], loading } = this.props;
    const { modalVisible, data, ...rest } = this.state;

    return (
      <>
        <HeaderComponent
          title={"Test Strip"}
          titleColor={"#0e2e65"}
          showAvtar={false}
          nextComponent={
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>Next</Text>
            </TouchableOpacity>
          }
        />

        {modalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContainer}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <TouchableOpacity style={styles.modal} onPress={e => e.preventDefault()} activeOpacity={1}>
                <Text>{JSON.stringify(rest)}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        ) : null}

        <ScrollView bounces={false} style={{ margin: 10, flex: 1 }}>
          {stripData && stripData.length
            ? stripData.map((val, index) => {
                if (val.values && val.values.length) {
                  return this.renderItem(val, index);
                } else {
                  return null;
                }
              })
            : null}
          <Loader loader={loading} />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => state.strips;

const mapDispatchToProps = { getData: fetchStrips };

export default connect(mapStateToProps, mapDispatchToProps)(StripsScreen);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: color.customGreyColorWithOpacity(0.8)
  },
  modal: {
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    height: 300,
    minWidth: "80%"
  }
});
