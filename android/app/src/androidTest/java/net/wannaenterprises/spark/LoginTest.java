package net.wannaenterprises.spark;


import android.support.test.espresso.ViewInteraction;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;

import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.closeSoftKeyboard;
import static android.support.test.espresso.action.ViewActions.replaceText;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withContentDescription;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static org.hamcrest.Matchers.allOf;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class LoginTest {

    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityTestRule<MainActivity> mActivityTestRule = new ActivityTestRule<>(MainActivity.class);

    @BeforeClass
    public static void beforeAll() {
        Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
    }

    @Test
    public void mainActivityTest() {
        // Added a sleep statement to match the app's execution delay.
        // The recommended way to handle such scenarios is to use Espresso idling resources:
        // https://google.github.io/android-testing-support-library/docs/espresso/idling-resource/index.html

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Home");


        ViewInteraction reactEditText = onView(
                allOf(withId(76), withContentDescription("LOG IN"), isDisplayed()));
        reactEditText.perform(click());


        Screengrab.screenshot("Login");


        ViewInteraction reactEditText2 = onView(
                allOf(withId(105), withContentDescription("Email"), isDisplayed()));
        reactEditText2.perform(click());

        ViewInteraction reactEditText3 = onView(
                allOf(withId(105), withContentDescription("Email"), isDisplayed()));
        reactEditText3.perform(replaceText("d.rickardinho@gmail.com"), closeSoftKeyboard());


        ViewInteraction reactEditText4 = onView(
                allOf(withId(112), withContentDescription("Password"), isDisplayed()));
        reactEditText4.perform(click());

        ViewInteraction reactEditText5 = onView(
                allOf(withId(112), withContentDescription("Password"), isDisplayed()));
        reactEditText5.perform(replaceText("dave123"), closeSoftKeyboard());


        Screengrab.screenshot("LoginFilledIn");


        ViewInteraction reactEditText6 = onView(
                allOf(withId(113), withContentDescription("LOG IN Submit"), isDisplayed()));
        reactEditText6.perform(click());

        Screengrab.screenshot("LogInConfirmed");


    }



}
