## End Points: DIGITAL NOMADS


| HTTP Method 	| URI path      	       | Description                                    	| JSON 	|
|-------------	|---------------	       |------------------------------------------------	|---------	|
| GET         	| `/`             	       | Index/ Home page - Check Roles and if User is Loggedin          	              | |
| GET         	| `/sign-up` 	           | Signup - Form - (render)    | |
| POST         	| `/sign-up`               | Sign up - Form - (handle)               | |
| GET         	| `/log-in`                | Login - Form-  (render)                | |
| POST         	| `/log-in`                | Login - Form-  (handle) 	            | |
| GET         	| `/logout` 	           | User Log out - Destroy Session- Redirect to `/log-in` 	                |  |
| GET         	| `/profile/:user_id/`     | User's Profile           | |
| GET         	| `/profile/:user_id/edit` | Edit User Profile - Form - (render)   	            | |
| POST         	| `/profile/:user_id/edit` | Edit User Profile - Form - (handle)   	            | |   	            | |
| GET         	| `/:user_id/saved-places`| User's saved places List   	            | |   	            | | 
| GET           | `/:user_id/my-created-places/places_:id`| User's created places List   	           	            | |   	            | |
| GET           | `/profile/:user_id/my-places/place_:id/edit`| Edit User's Place - Form- render       	            | |   	            | |
| POST          | `/profile/:user_id/my-places/place_:id/edit`| Edit User's Place - Form- handle       	            | |   	            | |
| POST         	| `/profile/:user_id//delete/place_:id` | Delete place 	            | |   	            | |
| GET   	    | `/explore/places`        | Google Maps render with places markers & create places button         	            | |
| GET         	| `/places/list`         | Display Place list      	            | |
| GET          	| `/places/create`         | Create Place - Form -  (render)       	            | |
| POST         	| `/places/create`         | Create Place - Form -  (handle)       	            | |
| GET          	| `/places/edit`         | Edit Created Place - Form -  (render)       	            | |
| POST         	| `/places/edit`         | Edit Created Place - Form -  (handle)       	            | |
| GET         	| `/api/places` 	   | Places `Array` 	                |  ✅|


<>

<!-- Para my places y saved places como se hace? Como son una lista por id y no solo un place no se como se hace? List id?  -->
<!-- Nos gustaria tener una lista de los lugares al lado del mapa pero no sabemos si se puede hacer -->

<!-- La idea es que a esta lista se llegue desde el perfil usando un boton -->