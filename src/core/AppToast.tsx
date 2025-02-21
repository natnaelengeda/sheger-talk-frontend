import toast from "react-hot-toast";

class AppToast {
  private constructor() { }

  static welcomeNotify = () =>
    toast('Happy Chatting', {
      duration: 4000,
      position: 'top-center',

      // Styling
      style: {},
      className: '',

      // Custom Icon
      icon: '😁',

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },

      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },

      // Additional Configuration
      removeDelay: 1000,
    });

}

export default AppToast;