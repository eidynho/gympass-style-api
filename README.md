# App
GymPass style app.

## RFs (Functional Requirements)

- [x] Users must be able to sign up;
- [x] Users must be able to authenticate;
- [x] Users must be able to access the profile of a logged-in user;
- [x] Users must be able to access the number of check-ins performed by the logged-in user;
- [x] Users must be able to access their check-in history;
- [x] Users must be able to search for nearby gyms up to 10 km;
- [x] Users must be able to search for gyms by name;
- [x] Users must be able to check-in to a gym;
- [x] Users must be able to validate a check-in;
- [x] Users must be able to register a gym;

## RNs (Business Rules)

- [x] Users cannot register with a duplicated email;
- [x] Users cannot check-in twice in the same day;
- [x] Users cannot check-in if they are not close (100m) to the gym;
- [x] A check-in can only be validated up to 20 minutes after being created;
- [x] Check-ins can only be validated by administrators;
- [x] Gyms can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [x] User passwords need to be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] Users must be identified by a JWT (JSON Web Token);