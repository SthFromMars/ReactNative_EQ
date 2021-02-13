package com.reactnative_eq;

import android.media.audiofx.BassBoost;
import android.media.audiofx.Equalizer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Timer;
import java.util.TimerTask;


public class EqModule extends ReactContextBaseJavaModule {


    private final Equalizer eq = new Equalizer(Integer.MAX_VALUE, 0);
    private BassBoost bb = new BassBoost(Integer.MAX_VALUE, 0);
    private int bbValue = 0;
    private final float stepCount = 15;
    private Timer bbTimer;

    EqModule(ReactApplicationContext context) {
        super(context);
        this.eq.usePreset((short) 0);
        this.bb.setStrength((short) 0);
    }

    @NonNull
    @Override
    public String getName() {
        return "EqModule";
    }

    @ReactMethod
    public void setStatus(boolean status, Callback callback) {
        this.eq.setEnabled(status);
        this.bb.setEnabled(status);
        callback.invoke();
    }

    @ReactMethod
    public void startBbTimer(){
        bbTimer = new Timer();
        TimerTask bbTimerTask = new TimerTask() {
            @Override
            public void run() {
                if(!bb.getStrengthSupported()){
                    bb = new BassBoost(Integer.MAX_VALUE, 0);
                    if(bb.getStrengthSupported()){
                        bb.setStrength((short) bbValue);
                    }
                }
            }
        };
        bbTimer.schedule(bbTimerTask, 0, 1000);
    }

    @ReactMethod
    public void stopBbTimer(){
        bbTimer.cancel();
    }

    @ReactMethod
    public void getEqSettings(Callback currentEqSettings) {
        WritableArray properties = Arguments.createArray();
        for(short level: eq.getProperties().bandLevels){
            float maxBandLevel = eq.getBandLevelRange()[1];
            int reactLevel = Math.round((float) level / (maxBandLevel / stepCount));
            properties.pushInt(reactLevel);
        }
        currentEqSettings.invoke(properties);
    }

    @ReactMethod
    public void getBbSettings(Callback currentBbSettings) {
        WritableMap properties = Arguments.createMap();
        properties.putBoolean("isSupported", bb.getStrengthSupported());
        properties.putInt("strength", bb.getRoundedStrength());
        currentBbSettings.invoke(properties);
    }

    @ReactMethod
    public void setBand(int level, int index) {
        short bandNr = (short) index;
        if(level == 0) eq.setBandLevel(bandNr, (short) level);
        else if(level > 0) {
            float maxBandLevel = eq.getBandLevelRange()[1];
            short androidLevel = (short) Math.round(maxBandLevel / stepCount * (float) level);
            eq.setBandLevel(bandNr, androidLevel);
        } else {
            float minBandLevel = eq.getBandLevelRange()[0];
            short androidLevel = (short) Math.round((-1) * minBandLevel / stepCount * (float) level);
            eq.setBandLevel(bandNr, androidLevel);
        }
    }

    @ReactMethod
    public void setBb(int level) {
        try {
            bb.setStrength((short) level);
        } catch (Exception e) {
            if(bb.getStrengthSupported()){
                e.printStackTrace();
            }
        }
        bbValue = level;
    }

    @ReactMethod
    public void refreshBb(Callback currentBbSettings) {
        bb = new BassBoost(Integer.MAX_VALUE, 0);
        getBbSettings(currentBbSettings);
    }
}
