import { DummyJsonClient } from '../clients/dummyJson.client.js';
import { JsonPlaceholderClient } from '../clients/jsonPlaceholder.client.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserController } from '../controllers/user.controller.js';
import { PostController } from '../controllers/post.controller.js';

class ControllersProvider {
    _authController = null;
    _userController = null;
    _postController = null;
    _dummyJsonClient = null;
    _jsonPlaceholderClient = null;

    _getDummyJsonClient() {
        if (!this._dummyJsonClient) {
            this._dummyJsonClient = new DummyJsonClient();
        }
        return this._dummyJsonClient;
    }

    _getJsonPlaceholderClient() {
        if (!this._jsonPlaceholderClient) {
            this._jsonPlaceholderClient = new JsonPlaceholderClient();
        }
        return this._jsonPlaceholderClient;
    }

    getAuthController() {
        if (!this._authController) {
            this._authController = new AuthController(this._getDummyJsonClient());
        }
        return this._authController;
    }

    getUserController() {
        if (!this._userController) {
            this._userController = new UserController(this._getDummyJsonClient());
        }
        return this._userController;
    }

    getPostController() {
        if (!this._postController) {
            this._postController = new PostController(this._getJsonPlaceholderClient());
        }
        return this._postController;
    }

    reset() {
        this._authController = null;
        this._userController = null;
        this._postController = null;
        this._dummyJsonClient = null;
        this._jsonPlaceholderClient = null;
    }
}

export const controllersProvider = new ControllersProvider();
