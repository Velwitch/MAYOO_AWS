import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import {importedRecipe} from '../../types/recipeTypes';
import ModalTemplate from '../recipe/modals/ModalTemplate';
import DeleteRecipe from '../recipe/modals/DeleteRecipe';
import AddToListModal from '../Lists/AddToListModal';
import {getUrl} from 'aws-amplify/storage';
import {BlurView} from '@react-native-community/blur';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  recipe: importedRecipe;
  sendQuery: (page: string, bool: boolean) => void;
}

const RecipesListCard: React.FC<HomeScreenProps> = ({
  navigation,
  recipe,
  sendQuery,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddToListModal, setAddToListModal] = useState<boolean>(false);
  const [recipeImageUrl, setRecipeImageUrl] = useState<string>();

  const createImageUrl = async () => {
    if (recipe.image) {
      const getUrlResult = await getUrl({
        key: recipe.image,
        options: {accessLevel: 'guest'},
      });
      setRecipeImageUrl(String(getUrlResult.url));
    }
  };
  useEffect(() => {
    createImageUrl();
    console.log('recipe image:', recipe.image);
  }, [recipe, navigation]);

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.recipeView}
        onPress={() => {
          setShowOptions(!showOptions);
        }}>
        {!recipe.image && (
          <Image
            source={require('../../assets/images/background.webp')}
            style={styles.recipeImage}></Image>
        )}
        {recipe.image && recipeImageUrl != undefined && (
          <Image
            source={{uri: recipeImageUrl}}
            style={styles.recipeImage}></Image>
        )}
        {recipe.image && recipeImageUrl == undefined && (
          <ActivityIndicator></ActivityIndicator>
        )}
        <View style={styles.textView}>
          <Text style={styles.textViewText}>{recipe.name}</Text>
        </View>

        {/* VIEW SHOWING DELETE MODIFY OPTIONS */}
        {showOptions && (
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                navigation.navigate('ShowRecipe', {id: recipe.id});
              }}
              style={styles.modifyView}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={6}
              />
              <Text style={styles.optionsButtonsText}>Show</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                setAddToListModal(true);
              }}
              style={styles.modifyView}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={6}
              />
              <Text style={styles.optionsButtonsText}>Add to a list</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                navigation.navigate('UpdateRecipe', {id: recipe.id});
              }}
              style={styles.modifyView}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={6}
              />
              <Text style={styles.optionsButtonsText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowOptions(false);
                setShowDeleteModal(true);
              }}
              style={styles.deleteView}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={6}
              />
              <Text style={styles.optionsButtonsText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MODALS*/}
        <ModalTemplate
          visible={showDeleteModal}
          onClose={() => {
            /* recipeData(); */
          }}>
          <DeleteRecipe
            recipeName={recipe.name}
            recipeID={recipe.id}
            originalRecipeId={recipe.originated}
            closeModal={() => {
              setShowDeleteModal(!showDeleteModal);
              sendQuery('first', true);
            }}></DeleteRecipe>
        </ModalTemplate>

        <ModalTemplate visible={showAddToListModal} onClose={() => {}}>
          <AddToListModal
            recipe={recipe}
            closeModal={() => {
              setAddToListModal(false);
            }}></AddToListModal>
        </ModalTemplate>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    display: 'flex',
  },
  recipeView: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    elevation: 20,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textView: {
    position: 'absolute',
    width: '70%',
    top: 10,
    alignSelf: 'center',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
  },

  textViewText: {fontSize: 20, fontFamily: 'Coffee', color: 'orange'},
  buttonView: {
    marginTop: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    paddingVertical: 10,
  },
  deleteView: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#f95959',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modifyView: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#79c2d0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  optionsButtonsText: {fontFamily: 'Coffee', fontSize: 18, color: 'white'},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default RecipesListCard;
