package net.wannaenterprises.spark;

import com.smixx.fabric.FabricPackage;
import android.app.Application;
import android.util.Log;
import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.entria.views.RNViewOverflowPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.smixx.fabric.FabricPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.bugsnag.BugsnagReactNative;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.entria.views.RNViewOverflowPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.bugsnag.BugsnagReactNative;
import io.branch.rnbranch.*;
import io.branch.referral.Branch;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
import io.fabric.sdk.android.Fabric;
import com.crashlytics.android.Crashlytics;
import java.util.Arrays;
import java.util.List;



public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new FabricPackage(),
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new FabricPackage(),
            new ReactNativeConfigPackage(),
            new RNBranchPackage(),
            BugsnagReactNative.getPackage(),
            new FIRMessagingPackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new FIRMessagingPackage(),
            new ReactNativeConfigPackage(),
            new RNBranchPackage(),
            BugsnagReactNative.getPackage()
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
    Fabric.with(this, new Crashlytics());
    BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
    Branch.getAutoInstance(this);
  }

}
