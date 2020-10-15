package com.reactnative_eq;

import android.media.audiofx.BassBoost;
import android.widget.Toast;
import android.media.MediaPlayer;
import android.media.audiofx.Equalizer;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class EqModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

//    private Equalizer eq = new Equalizer(0, 0);
//    private BassBoost bb = new BassBoost(0, 0);

    EqModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "EqModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void getEqSettings(Callback currentEqSettings) {
//        MediaPlayer mediaPlayer = new MediaPlayer();
//        Equalizer eq = new Equalizer(0, mediaPlayer.getAudioSessionId());
        BassBoost bb = new BassBoost(0, 0);
        Equalizer eq = new Equalizer(0, 0);
        currentEqSettings.invoke("This is Java talking\n" + eq.getProperties().toString() + "\n" + bb.getProperties().toString());

    }

    @ReactMethod
    public void setBassBoostLevel(int level) {
        BassBoost bb = new BassBoost(0, 0);
        bb.setStrength( (short) level);
    }

    @ReactMethod
    public void setHighBass() {
        Equalizer eq = new Equalizer(0, 0);
        short bandCount = eq.getNumberOfBands();
        int bassBands = (int) (bandCount/2);

        short[] bandLevelRange = eq.getBandLevelRange();

        for(int i=0; i<bandCount; i++){
            short setTo;
            if(i<bassBands){
                setTo = bandLevelRange[1];
            } else {
                setTo = bandLevelRange[0];
            }
            eq.setBandLevel((short) i, setTo);
        }

        BassBoost bb = new BassBoost(0, 0);
        bb.setStrength((short) 1000);
    }

    @ReactMethod
    public void setLowBass() {
        Equalizer eq = new Equalizer(0, 0);
        short bandCount = eq.getNumberOfBands();
        int bassBands = (int) (bandCount/2);

        short[] bandLevelRange = eq.getBandLevelRange();

        for(int i=0; i<bandCount; i++){
            short setTo;
            if(i<bassBands){
                setTo = bandLevelRange[0];
            } else {
                setTo = bandLevelRange[1];
            }
            eq.setBandLevel((short) i, setTo);
        }

        BassBoost bb = new BassBoost(0, 0);
        bb.setStrength((short) 0);
    }
}
