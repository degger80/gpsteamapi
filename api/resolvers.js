import { Contact,
        Antenna,
        Receiver,
        Charger,
        Sitename,
        Associated,
        Field,
        Gallery,
        GPSCont,
        Staff,
        Logistic,
        Logsheet,
        Observer,
        Division,
        Position,
        Site,
        Surveytype,
      } from '../sql/connector';

import { pubsub } from './schema';

const resolvers = {
  Mutation: {
    createContact(_, args) {
      return Contact.create(args)
        .then((newcontact) => {
          pubsub.publish('contactCreated', newcontact.dataValues);
          return newcontact;
        }).catch(err => {
          console.error(err);
          return err;
        });
    },
    deleteContact(_, args) {
      return Contact.destroy({ where: args })
        .then((success) => {
          console.log('success', success);
          console.log('id', args);
          pubsub.publish('contactDeleted', args);
          return args.id;
        });
    },
  },
  Subscription: {
    contactDeleted(args) {
      console.log('contact deleted with id ', args.id);
      return args.id;
    },
    contactCreated(contact) {
      console.log('new contact created', contact);
      return contact;
    },
  },
  Query: {
    Sitename(_, args) {
      return Sitename.find({ where: args });
    },
    allSitename(_, args) {
      return Sitename.findAll({ limit: args.limit, offset: args.offset });
    },
    Contact(_, args) {
      return Contact.find({ where: args });
    },
    allContact(_, args) {
      return Contact.findAll({ limit: args.limit, offset: args.offset, order: args.order });
    },
    Antenna(_, args) {
      return Antenna.find({ where: args });
    },
    allAntenna() {
      return Antenna.findAll();
    },
    Receiver(_, args) {
      return Receiver.find({ where: args });
    },
    allReceiver() {
      return Receiver.findAll();
    },
    Charger(_, args) {
      return Charger.find({ where: args });
    },
    allCharger() {
      return Charger.findAll();
    },
    Associated(_, args) {
      return Associated.find({ where: args });
    },
    allAssociated() {
      return Associated.findAll();
    },
    Field(_, args) {
      return Field.find({ where: args });
    },
    allField() {
      return Field.findAll();
    },
    Gallery(_, args) {
      return Gallery.find({ where: args });
    },
    allGallery() {
      return Gallery.findAll();
    },
    GPSCont(_, args) {
      return GPSCont.find({ where: args });
    },
    allGPSCont() {
      return GPSCont.findAll();
    },
    Staff(_, args) {
      return Staff.find({ where: args });
    },
    allStaff() {
      return Staff.findAll();
    },
    Logistic(_, args) {
      return Logistic.find({ where: args });
    },
    allLogistic() {
      return Logistic.findAll();
    },
    Logsheet(_, args) {
      return Logsheet.find({ where: args });
    },
    allLogsheet() {
      return Logsheet.findAll();
    },
    Observer(_, args) {
      return Observer.find({ where: args });
    },
    allObserver() {
      return Observer.findAll();
    },
    Division(_, args) {
      return Division.find({ where: args });
    },
    allDivision() {
      return Division.findAll();
    },
    Position(_, args) {
      return Position.find({ where: args });
    },
    allPosition() {
      return Position.findAll();
    },
    Site(_, args) {
      return Site.find({ where: args });
    },
    allSite() {
      return Site.findAll();
    },
    Surveytype(_, args) {
      return Surveytype.find({ where: args });
    },
    allSurveytype() {
      return Surveytype.findAll();
    },
// input more query at the top of this comment
  },
};


export default resolvers;