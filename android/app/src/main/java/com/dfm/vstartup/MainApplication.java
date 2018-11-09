package com.dfm.vstartup;

import android.app.Application;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.beefe.picker.PickerViewPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import ui.popovermenu.RNPopoverMenuPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.opensettings.OpenSettingsPakage;
import java.util.List;
import java.util.Arrays;
import com.react.rnspinkit.RNSpinkitPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGoogleSigninPackage(),
          new PickerViewPackage(),
          new RNGooglePlacesPackage(),
          new RNPopoverMenuPackage(),
          new ReactNativeYouTube(),
          new VectorIconsPackage(),
          new ReactNativeRestartPackage(),
          new FBSDKPackage(mCallbackManager),
          new ReactNativeLocalizationPackage(),
          new MapsPackage(),
          new OpenSettingsPakage(),
          new RNSpinkitPackage(),
          new FastImageViewPackage(),
          new PickerPackage(),
          new RNFetchBlobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
