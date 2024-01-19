export const UserFixture = {
  valid: {
    bob: {
      email: "bob.sager@gmail.com",
      password: "testpassword!",
      username: "ricky_bob-99",
    },

    bruce: {
      email: "bruce.ventrue@hotmail.com",
      password: "testpassword!",
      username: "almighty-brucey",
    },

    billy: {
      email: "billprice@outlook.com",
      password: "testpassword!",
      username: "big-bills-billy",
    },
  },
  invalid: {
    email: {
      bob: {
        email: "bob.sager@.com",
        password: "testpassword!",
        username: "ricky_bob-99",
      },
    },
    password: {
      bob: {
        email: "bob.sager@gmail.com",
        password: "te",
        username: "ricky_bob-99",
      },
    },
  },

  error: {
    incorrectPassword: {
      bob: {
        email: "bob.sager@gmail.com",
        password: "testpadsgssswo",
        username: "ricky_bob-99",
      },

      bruce: {
        email: "bruce.ventrue@hotmail.com",
        password: "testwosdgsrd!",
        username: "almighty-brucey",
      },

      billy: {
        email: "billprice@outlook.com",
        password: "testpadsgsdgrd!",
        username: "big-bills-billy",
      },
    },
    incorrectEmail: {
      bob: {
        email: "bob.sager@outlook.com",
        password: "testpassword!",
        username: "ricky_bob-99",
      },

      bruce: {
        email: "ventrue@gmail.com",
        password: "testpassword!",
        username: "almighty-brucey",
      },

      billy: {
        email: "bill@outlook.com",
        password: "testpassword!",
        username: "big-bills-billy",
      },
    },
  },
};
