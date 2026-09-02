import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [nombre, setNombre] = useState("Alan Paganelli");
  const [bio, setBio] = useState("Observando si la app funciona");

  return (
    <SafeAreaView style={stls_cuerpo.principal}>

      <ScrollView contentContainerStyle={stls_cuerpo.contenedor}>

        <View style={stls_cuerpo.contenedor}>

          <Image
            resizeMode="contain"
            source = {{uri: 'https://picsum.photos/200'}}
            style = {stls_imagenes.perfil} />

          <Text style={stls_textos.nombre}>
            {nombre}
          </Text>

          <Text style={stls_textos.bio}>
            {bio}
          </Text>

        </View>

        <View style={stls_cuerpo.subcontenedor}>

          <Text style={stls_textos.etiqueta}>
            Nombre:
          </Text>

          <TextInput
            onChangeText={setNombre}
            style={stls_cuerpo.entrada}
            value={nombre}/>

        </View>
        
        <View style={stls_cuerpo.subcontenedor}>

          <Text style={stls_textos.etiqueta}>
            Bio:
          </Text>

          <TextInput 
            onChangeText={setBio}
            style={stls_cuerpo.entrada}
            value={bio}/>

        </View>

        <TouchableOpacity style={stls_cuerpo.boton} onPress={() => alert('Datos actualizados')}>

          <Text style={stls_textos.boton}>
            ACTUALIZAR DATOS
          </Text>

        </TouchableOpacity>

        <Image 
          resizeMode="contain"
          source={require('../assets/images/listo para crear aberraciones cromaticas.png')}
          style={stls_imagenes.wauwau}/>

      </ScrollView>

    </SafeAreaView>
  );
}

const stls_cuerpo = StyleSheet.create(
  {
    principal: {backgroundColor: '#ddeeff', flex: 1},
    contenedor: {alignItems: 'center', backgroundColor: '#ccddee', borderRadius: 30, padding: 20},
    subcontenedor: {backgroundColor: '#c0d0e0', borderRadius: 15, padding: 10, width: '100%'},
    entrada: {backgroundColor: '#ffffff', padding: 5, width: '100%'},
    boton: {backgroundColor: '#aabbcc', borderColor: '#bbccdd', borderRadius: 15, borderWidth: 5, margin: 10, padding: 5},
  }
)

const stls_imagenes = StyleSheet.create(
  {
    perfil: {borderRadius: 64, height: 128, width: 128},
    wauwau: {height: 200, width: 200},
  }
)

const stls_textos = StyleSheet.create(
  {
    nombre: {color: '#000033', fontSize: 30, fontWeight: 'bold', marginTop: 10, textAlign: 'center'},
    bio: {color: '#000033', fontSize: 20, fontWeight: 'bold', marginTop: 10, textAlign: 'center'},
    etiqueta: {color: '#000044', fontSize: 16, fontWeight: 'bold', margin: 10, textAlign: 'auto'},
    boton:{color: '#000022', fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
  }
)//Pensado para texto suelto en <Text/> solamente