import express from 'express';
import contactsController from '../../controllers/contacts-controller.js'

import { contactAddSchema, contactUpdateFavoriteSchema } from '../../models/Contact.js';
import { isValidId, isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from '../../decorators/index.js';

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router()

contactsRouter.use(authenticate);

router.get('/',authenticate, contactsController.getAll);
router.get('/:contactId', authenticate,isValidId, contactsController.getById);
router.post('/', authenticate,isEmptyBody, contactAddValidate, contactsController.add);
router.delete('/:contactId', authenticate,isValidId, contactsController.deleteById);
router.put('/:contactId',authenticate, isValidId, isEmptyBody, contactUpdateValidate, contactsController.updateById);
router.patch('/:contactId/favorite', authenticate,isValidId, isEmptyBody, contactUpdateFavoriteValidate, contactsController.updateFavorite);

export default router;