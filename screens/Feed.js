import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

let stories = [
  {
    "title": "O Pastor Mentiroso e o Lobo",
    "author": "Apoorv Goyal",
    "created_on": "25 de Janeiro de 2021",
    "description": "A história de um menino que mentiu e perdeu a confiança das pessoas próximas a ele.",
    "story": "Era uma vez um menino pastor que estava entediado vendo seu rebanho de ovelhas na colina. Para se divertir, ele gritou: “Lobo! Lobo! O lobo está perseguindo a ovelha!” Os aldeões vieram correndo ajudar o menino e salvar as ovelhas. Eles não encontraram nada, e o menino apenas riu, olhando para seus rostos irritados.\n\n “Não grite ‘lobo’ quando não há lobo, menino!”, eles disseram com raiva e foram embora. O menino apenas riu deles.\n\nDepois de um tempo, ele ficou entediado e gritou 'Lobo!' novamente, enganando os aldeões pela segunda vez. Os aldeões furiosos avisaram o menino uma segunda vez e foram embora. O menino continuou observando o rebanho. Depois de um tempo, ele viu um lobo de verdade e gritou alto, “Lobo! Por favor ajude! O lobo está perseguindo as ovelhas. Ajudem!”\n\n Mas desta vez, ninguém apareceu para ajudar. À noite, quando o menino não voltou para casa, os aldeões se perguntaram o que aconteceu com ele e subiram a colina. O menino sentou-se na colina chorando. “Por que você não veio quando eu gritei que havia um lobo?” ele perguntou com raiva. “O rebanho está disperso agora”, disse ele.\n\n Um velho aldeão se aproximou dele e disse: “As pessoas não vão acreditar em mentirosos mesmo quando eles dizem a verdade. Vamos procurar suas ovelhas amanhã de manhã. Vamos para casa agora”.\n\n",
    "moral": "Mentir quebra a confiança. Ninguém confia em um mentiroso, mesmo quando ele está dizendo a verdade."
  },
  {
    "title": "O Toque de Midas",
    "author": "Saurabh Aswani",
    "created_on": "14 de Janeiro de 2021",
    "description": "A história de um rei e sua ganância.",
    "story": "Na Grécia antiga, havia um rei chamado Midas. Ele tinha muito ouro e tudo o que precisava. Ele também tinha uma filha linda. Midas amava muito seu ouro, mas amava sua filha mais do que suas riquezas.\n\nUm dia, um mago chamado Silenus ficou bêbado e desmaiou no jardim de rosas de Midas. Acreditando que os magos sempre trazem boa sorte, Midas deixa Sileno descansar em seu palácio até ficar sóbrio, contra a vontade de sua esposa e filha.. Sileno é amigo de Dionísio, o Deus do vinho e da celebração. Ao saber da gentileza de Midas para com seu amigo, Dionísio decide recompensar o rei.\n\nQuando solicitado a desejar algo, Midas diz: “Desejo que tudo que tocar se transforme em ouro”. Embora Dionísio soubesse que não era uma grande ideia, ele concedeu a Midas seu desejo.\n\nFeliz por seu desejo ter sido atendido, Midas passou a tocar em coisas aleatórias no jardim e em seu palácio e transformou tudo em ouro. Ele tocou uma maçã, e ela se transformou em uma maçã dourada brilhante. Seus súditos ficaram surpresos, mas felizes ao ver tanto ouro no palácio.\n\nEm sua felicidade, Midas foi e abraçou sua filha, e antes que ele percebesse, ele a transformou em uma estátua dourada e sem vida! Horrorizado, Midas correu de volta para o jardim e chamou Dionísio. Ele implorou para que ele tirasse seu poder e salvasse sua filha. Dionísio dá a Midas uma solução para mudar tudo de volta ao que era antes do desejo. Midas aprendeu sua lição e viveu o resto de sua vida contente com o que tinha.\n\n",
    "moral": "Não seja ganancioso. Seja feliz e contente com o que você tem."
  }
]


export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  renderItem = ({ item: story }) => {
    return <StoryCard story={story} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>App Narração de Histórias</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85,
  },
});
