# App
GymPass style app.

## RFs (Functional Requirements)

- [ ] Users must be able to sign up;
- [x] Users must be able to authenticate;
- [ ] Users must be able to access the profile of a logged-in user;
- [ ] Users must be able to access the number of check-ins performed by the logged-in user;
- [ ] Users must be able to access their check-in history;
- [ ] Users must be able to search for nearby gyms;
- [ ] Users must be able to search for gyms by name;
- [ ] Users must be able to check-in to a gym;
- [ ] Users must be able to validate a check-in;

## RNs (Business Rules)

- [x] Users cannot register with a duplicated email;
- [ ] Users cannot check-in twice in the same day;
- [ ] Users cannot check-in if they are not close (100m) to the gym;
- [ ] A check-in can only be validated up to 20 minutes after being created;
- [ ] Check-ins can only be validated by administrators;
- [ ] Gyms can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [x] User passwords need to be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] Users must be identified by a JWT (JSON Web Token);