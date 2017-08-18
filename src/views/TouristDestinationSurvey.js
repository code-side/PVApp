import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import I18n from '../services/LanguageService';
import { Text, Row, Button, Header, Title, Footer, FooterTab } from 'native-base';

class TouristDestinationSurvey extends Component {

  constructor(props) {
    super(props);

    this.tags = [];
    this.asked = [];
    this.count = 0;
    this.currentQuestion = null;
    this.state = {
      isVisible: props.isVisible || false
    };
  }

  componentWillMount() {
    if (this.props.modalRef !== undefined) {
      this.props.modalRef(this);
    }

    this.loadNext();
  }

  componentWillUnmount() {
    if (this.props.modalRef !== undefined) {
      this.props.modalRef(null);
    }
  }

  showModal() {
    this.tags = [];
    this.asked = [];
    this.count = 0;
    this.currentQuestion = null;
    this.loadNext();
    this.setState({isVisible: true});
  }

  isActive() {
    return this.state.isVisible;
  }

  closeModal() {
    if (this.props.onModalClose !== undefined) {
      this.props.onModalClose();
    }

    this.setState({isVisible: false});
  }

  getTags() {
    return this.tags;
  }

  isSurveyFinished() {
    return (this.asked.length >= this.props.questions.length) || this.count > MAX_QUESTIONS;
  }

  getRandomSurvey() {
    const surveyCant = this.props.questions.length;
    let surIndx = Math.floor((Math.random() * surveyCant));
    return this.props.questions[surIndx];
  }

  loadNext(accept) {
    if (this.isSurveyFinished()) {
      this.closeModal();
    } else if (this.currentQuestion === null) {
      let alreadyAsked;
      let nextQuestion;

      do {
        nextQuestion = this.getRandomSurvey();
        alreadyAsked = (this.asked.indexOf(nextQuestion.id) !== -1);
      } while (alreadyAsked);

      this.asked.push(nextQuestion.id);
      this.currentQuestion = nextQuestion;
      this.count++;
    } else {
      if (accept) {
        this.tags.push(this.currentQuestion.linkedAttribute);
      }

      this.currentQuestion = this.currentQuestion[(accept ? 'nextTrueQuestion' : 'nextFalseQuestion')];

      if (this.currentQuestion === null) {
        this.loadNext();
      } else {
        this.count++;
      }

      this.setState(this.state);
    }
  }

  render() {
    let bullets = [];
    for (var i = 1; i <= MAX_QUESTIONS; i++) {
      let backColor = (this.count > i) ? 'lightgreen' : 'lightgray';
      let bullet = (<View key={i} style={[styles.progressCircle, {backgroundColor: backColor}]} />);
      bullets.push(bullet);
    }

    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackButtonPress={() => {this.setState({isVisible: false}); this.props.onModalClose();}}>
        <View style={styles.modalStyle}>
          {/* Modal title */}
          <Header style={styles.modalHeader}>
            <Title style={{marginTop: 12}}>{I18n.t('touristDestination.survey.title')}</Title>
          </Header>

          {/* Modal body */}
          <View style={{flex: 1}}>
            {/* Question */
              this.currentQuestion ? (
                <Text style={styles.questions}>{this.currentQuestion.question}</Text>
              ) : (
                <Text style={styles.questions}>{'No hay preguntas'}</Text>
              )
            }

            {/* Options or summary */}
            {
              this.currentQuestion && (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15}}>
                  <View style={{width: 150, flexDirection: 'row'}}>
                    <Button bordered danger onPress={() => this.loadNext(false)} style={{marginRight: 15, width: 60}}>
                      <Text style={{flex: 1, textAlign: 'center'}}>{I18n.t('general.noOption')}</Text>
                    </Button>
                    <Button bordered success onPress={() => this.loadNext(true)} style={{marginLeft: 15, width: 60}}>
                      <Text style={{flex: 1, textAlign: 'center'}}>{I18n.t('general.yesOption')}</Text>
                    </Button>
                  </View>
                </View>
              )
            }

            {/* Progress */}
            <Row style={{flex: 1, justifyContent: 'center'}}>
              {bullets}
            </Row>
          </View>

          {/* Button actions */}
          <Footer style={styles.modalFooter}>
            <FooterTab style={styles.modalFooter}>
              <Button full onPress={() => this.closeModal()}>
                <Text style={{fontSize: 14}}>{I18n.t('general.close')}</Text>
              </Button>
            </FooterTab>
          </Footer>

        </View>
      </Modal>
    );
  }
}

const MAX_QUESTIONS = 6;
const styles = {
  modalHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  modalStyle: {
    marginLeft: 30,
    marginRight: 30,
    height: 320,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  modalFooter: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  questions: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 30
  },
  progressCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 6,
    marginTop: 20
  },
  tagsRow: {
    backgroundColor: 'lightgray',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  }
};

const mapStateToProps = state => {
  return {
    questions: state.db.staticData.surveyQuestions
  };
};

export default connect(mapStateToProps, null)(TouristDestinationSurvey);
