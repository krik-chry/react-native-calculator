import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      calculationText: '0',
      resultText: ''
    };
    this.operations = ['/', '*', '-', '+'];
    this.actions = ['C', 'Delete'];
    this.operators = ['*', '/', '-', '+'];
  }

  validate() {
    const text = this.state.calculationText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;

      default:
        return true;
    }
  }

  operate(operation) {
    switch (operation) {
      case '=':
        return this.validate() && this.calculateResult();

      case 'C':
        this.setState({
          resultText: '',
          calculationText: '0'
        });
        break;
      case 'Delete':
        if (this.state.calculationText === '0') {
          break;
        }
        if (this.state.calculationText.length > 1) {
          let text = this.state.calculationText.split('');
          text.pop();
          this.setState({
            calculationText: text.join('')
          });
        } else {
          this.setState({
            calculationText: '0'
          });
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastCharacter = this.state.calculationText[this.state.calculationText.length - 1];
        if (this.operators.indexOf(lastCharacter) > -1) return;

        if (this.state.calculationText == '') return;

        this.setState({
          calculationText: this.state.calculationText + operation
        });
        break;
    }
  }

  calculateResult() {
    const text = this.state.calculationText;
    this.setState({
      resultText: eval(text)
    });
  }

  buttonPressed(text) {
    if (this.state.calculationText === '0') {
      this.setState({ calculationText: text });
    } else {
      this.setState({
        calculationText: `${this.state.calculationText}` + `${text}`
      });
    }
  }

  render() {
    let opsHorizontal = [];
    for (let i = 0; i < 2; i++) {
      opsHorizontal.push(
        <TouchableOpacity onPress={() => this.operate(this.actions[i])} style={styles.btn}>
          <Text style={styles.operation}>{this.actions[i]}</Text>
        </TouchableOpacity>
      );
    }

    let opsVertical = [];
    for (let i = 0; i < 4; i++) {
      opsVertical.push(
        <TouchableOpacity onPress={() => this.operate(this.operations[i])} style={styles.btn}>
          <Text style={styles.operation}>{this.operations[i]}</Text>
        </TouchableOpacity>
      );
    }

    let rows = [];
    let numbers = [
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
      ['', 0, '.']
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity onPress={() => this.buttonPressed(numbers[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{numbers[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            <View style={styles.opsHorizontal}>{opsHorizontal}</View>
            {rows}
          </View>
          <View style={styles.opsVertical}>
            {opsVertical}
            <TouchableOpacity onPress={() => this.operate('=')} style={styles.equalBtn}>
              <Text style={styles.equalText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  result: {
    flex: 1.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginEnd: 10
  },
  calculationText: {
    fontSize: 30,
    color: 'white'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginEnd: 10
  },
  resultText: {
    fontSize: 40,
    color: 'white'
  },
  buttons: {
    flex: 8,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'black'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 40,
    color: 'white'
  },
  equalBtn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  equalText: {
    textAlign: 'center',
    fontSize: 40,
    width: 50,
    height: 50,
    color: 'white',
    backgroundColor: 'orange',
    borderRadius: 50
  },
  operation: {
    color: 'orange',
    fontSize: 40
  },
  opsHorizontal: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black'
  },
  opsVertical: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black'
  }
});
