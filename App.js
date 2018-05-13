import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native'
import {Constants} from 'expo'

let id = 0

const styles = StyleSheet.create({
  inventoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  fill: {
    flex: 1,
  }
})

const Inventory = props => (
  <View style={styles.inventoryContainer}>
    <Switch value={props.inventory.checked} onValueChange={props.onToggle} />
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.inventory.text}</Text>
  </View>
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      inventories: [],
    }
  }

  addInventory() {
    id++
    const text = `Inventory number ${id}`
    this.setState({
      inventories: [
        ...this.state.inventories,
        {id: id, text: text, checked: false},
      ], 
    })
  }

  removeInventory(id) {
    this.setState({
      inventories: this.state.inventories.filter(inventory => inventory.id !== id)
    })
  }

  toggleInventory(id) {
    this.setState({
      inventories: this.state.inventories.map(inventory => {
        if (inventory.id !== id) return inventory
        return {
          id: inventory.id,
          text: inventory.text,
          checked: !inventory.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text>Inventory count: {this.state.inventories.length}</Text>
        <Text>Unchecked inventory count: {this.state.inventories.filter(inventory => !inventory.checked).length}</Text>
        <Button onPress={() => this.addInventory()} title="Add Inventory" />
        <ScrollView style={styles.fill}>
          {this.state.inventories.map(inventory => (
            <Inventory
              onToggle={() => this.toggleInventory(inventory.id)}
              onDelete={() => this.removeInventory(inventory.id)}
              inventory={inventory}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

