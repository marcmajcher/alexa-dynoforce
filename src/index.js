'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');

const APP_ID = 'DnynoForce Generator'; // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'DynoForce Name Generator';
const HELP_MESSAGE = 'You can ask me for a mech name, a pilot name, or a kaiju name. What can I do for you?';
const HELP_REPROMPT = 'Would you like me to give you a mech name, a pilot name, or a kaiju name?';
const STOP_MESSAGE = 'Good bye, and good hunting.';
// const NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for...';
// const NOT_FOUND_REPROMPT = 'Would you like me to give you ...?';

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  SAMPLEIntent: function SAMPLEIntent() {
    if (true) {
      const speechOutput = 'Test';
      this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput);
    }
    else {
      this.emit('LaunchRequest');
    }
    //   // incorrect request type
    //   this.emit(':ask', NOT_FOUND_MESSAGE, NOT_FOUND_REPROMPT);
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', STOP_MESSAGE);
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
