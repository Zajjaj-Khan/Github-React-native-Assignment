import React from 'react'
import { FlatList } from 'react-native'
import UserComponent from './UserComponent'

function ListComponent({data, onSelect}:any) {
  return (
    <FlatList
    data={data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <UserComponent item={item} onSelect={onSelect} />}
  />
  )
}

export default ListComponent