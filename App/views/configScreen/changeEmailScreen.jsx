import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';

const TEAL = '#1BB585';
const BG = '#F5F5ED';
const DARK = '#1A1A1A';
const MUTED = '#888880';
const DANGER = '#D85A30';
const CARD = '#EEEEE6';

const CURRENT_EMAIL = 'user@email.com'; // substitua pelo email real do usuário

function Field({ label, placeholder, value, onChangeText, onFocus, onBlur, focused, error, keyboardType, autoCapitalize }) {
    return (
        <View>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
                style={[styles.input, focused && styles.inputFocused, error && styles.inputError]}
                placeholder={placeholder}
                placeholderTextColor="#AAAAAA"
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                keyboardType={keyboardType || 'default'}
                autoCapitalize={autoCapitalize || 'none'}
                returnKeyType="next"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

function StepIndicator({ step }) {
    const steps = ['New Email', 'Confirm', 'Verify'];
    return (
        <View style={styles.stepContainer}>
            {steps.map((label, i) => {
                const idx = i + 1;
                const active = idx === step;
                const done = idx < step;
                return (
                    <React.Fragment key={label}>
                        <View style={styles.stepItem}>
                            <View style={[
                                styles.stepCircle,
                                active && styles.stepCircleActive,
                                done && styles.stepCircleDone,
                            ]}>
                                <Text style={[
                                    styles.stepNumber,
                                    (active || done) && styles.stepNumberActive,
                                ]}>
                                    {done ? '✓' : idx}
                                </Text>
                            </View>
                            <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
                                {label}
                            </Text>
                        </View>
                        {i < steps.length - 1 && (
                            <View style={[styles.stepLine, done && styles.stepLineDone]} />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

export default function ChangeEmailScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [focused, setFocused] = useState('');
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateStep1 = () => {
        const e = {};
        if (!isValidEmail(newEmail)) e.newEmail = 'Enter a valid email address.';
        if (newEmail === CURRENT_EMAIL) e.newEmail = 'This is already your current email.';
        if (newEmail !== confirmEmail) e.confirmEmail = 'Emails do not match.';
        if (!password) e.password = 'Enter your current password to confirm.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e = {};
        if (code.length < 6) e.code = 'Enter the 6-digit code sent to your email.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
            setTimeout(() => {
                Alert.alert('Email updated!', `Your email has been changed to ${newEmail}.`, [
                    { text: 'OK', onPress: () => navigation?.goBack() },
                ]);
            }, 300);
        }
    };

    const handleResend = () => {
        Alert.alert('Code resent', `A new code was sent to ${newEmail}.`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />

            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => (step > 1 ? setStep(s => s - 1) : navigation?.goBack())}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backArrow}>‹</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Ícone + Título */}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.iconEmoji}>📧</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Change Email</Text>
                    <Text style={styles.subtitle}>
                        {step === 1
                            ? 'Enter your new email and confirm your password.'
                            : 'Enter the 6-digit code sent to your new email.'}
                    </Text>

                    {/* Step indicator */}
                    <StepIndicator step={step} />

                    {/* Step 1 */}
                    {step === 1 && (
                        <View style={styles.fieldsContainer}>
                            {/* Email atual (readonly) */}
                            <View>
                                <Text style={styles.fieldLabel}>Current Email</Text>
                                <View style={styles.readonlyBox}>
                                    <Text style={styles.readonlyText}>{CURRENT_EMAIL}</Text>
                                </View>
                            </View>

                            <Field
                                label="New Email"
                                placeholder="Enter new email"
                                value={newEmail}
                                onChangeText={setNewEmail}
                                onFocus={() => setFocused('newEmail')}
                                onBlur={() => setFocused('')}
                                focused={focused === 'newEmail'}
                                error={errors.newEmail}
                                keyboardType="email-address"
                            />

                            <Field
                                label="Confirm New Email"
                                placeholder="Repeat new email"
                                value={confirmEmail}
                                onChangeText={setConfirmEmail}
                                onFocus={() => setFocused('confirmEmail')}
                                onBlur={() => setFocused('')}
                                focused={focused === 'confirmEmail'}
                                error={errors.confirmEmail}
                                keyboardType="email-address"
                            />

                            <Field
                                label="Current Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setFocused('password')}
                                onBlur={() => setFocused('')}
                                focused={focused === 'password'}
                                error={errors.password}
                            />
                        </View>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <View style={styles.fieldsContainer}>
                            <View style={styles.verifyInfo}>
                                <Text style={styles.verifyInfoText}>
                                    We sent a 6-digit code to{' '}
                                    <Text style={{ color: TEAL, fontWeight: '600' }}>{newEmail}</Text>
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.fieldLabel}>Verification Code</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.codeInput,
                                        focused === 'code' && styles.inputFocused,
                                        errors.code && styles.inputError,
                                    ]}
                                    placeholder="000000"
                                    placeholderTextColor="#AAAAAA"
                                    value={code}
                                    onChangeText={t => setCode(t.replace(/[^0-9]/g, '').slice(0, 6))}
                                    onFocus={() => setFocused('code')}
                                    onBlur={() => setFocused('')}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                />
                                {errors.code ? <Text style={styles.errorText}>{errors.code}</Text> : null}
                            </View>

                            <TouchableOpacity onPress={handleResend} activeOpacity={0.7} style={styles.resendRow}>
                                <Text style={styles.resendText}>
                                    Didn't receive it?{' '}
                                    <Text style={styles.resendLink}>Resend code</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

                {/* Botão principal */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleNext}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.saveButtonText}>
                            {step === 1 ? 'Continue' : 'Verify & Save'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: BG },
    keyboardAvoid: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    header: { 
        paddingTop: 35, 
        paddingBottom: 16 
    },
    backButton: {
        width: 36, height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.06)',
        alignItems: 'center', justifyContent: 'center',
    },
    backArrow: { fontSize: 28, color: DARK, lineHeight: 32, marginTop: -2 },

    iconContainer: { alignItems: 'center', marginBottom: 16 },
    iconCircle: {
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: CARD,
        alignItems: 'center', justifyContent: 'center',
    },
    iconEmoji: { fontSize: 32 },

    title: {
        fontSize: 28, fontWeight: '700', color: DARK,
        textAlign: 'center', marginBottom: 8,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    subtitle: {
        fontSize: 14, color: MUTED,
        textAlign: 'center', marginBottom: 24,
        lineHeight: 20, paddingHorizontal: 8,
    },

    // Steps
    stepContainer: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    stepItem: { alignItems: 'center', gap: 4 },
    stepCircle: {
        width: 28, height: 28, borderRadius: 14,
        borderWidth: 1.5, borderColor: '#D0D0C8',
        backgroundColor: BG,
        alignItems: 'center', justifyContent: 'center',
    },
    stepCircleActive: { borderColor: TEAL, backgroundColor: TEAL },
    stepCircleDone: { borderColor: TEAL, backgroundColor: TEAL },
    stepNumber: { fontSize: 12, fontWeight: '600', color: MUTED },
    stepNumberActive: { color: '#FFF' },
    stepLabel: { fontSize: 11, color: MUTED },
    stepLabelActive: { color: TEAL, fontWeight: '600' },
    stepLine: {
        flex: 1, height: 1.5,
        backgroundColor: '#D0D0C8',
        marginHorizontal: 6, marginBottom: 16,
    },
    stepLineDone: { backgroundColor: TEAL },

    // Fields
    fieldsContainer: { gap: 20 },
    fieldLabel: {
        fontSize: 13, fontWeight: '500',
        color: MUTED, marginBottom: 8, paddingLeft: 4,
    },
    input: {
        height: 52, borderRadius: 50,
        borderWidth: 1.5, borderColor: '#D0D0C8',
        backgroundColor: BG,
        paddingHorizontal: 20,
        fontSize: 15, color: DARK,
    },
    inputFocused: { borderColor: TEAL },
    inputError: { borderColor: DANGER },
    errorText: {
        fontSize: 12, color: DANGER,
        marginTop: 6, paddingLeft: 8,
    },

    readonlyBox: {
        height: 52, borderRadius: 50,
        backgroundColor: CARD,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    readonlyText: { fontSize: 15, color: MUTED },

    // Verify step
    verifyInfo: {
        backgroundColor: CARD, borderRadius: 16,
        padding: 16,
    },
    verifyInfoText: { fontSize: 14, color: DARK, textAlign: 'center', lineHeight: 20 },

    codeInput: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 8,
    },

    resendRow: { alignItems: 'center', marginTop: 4 },
    resendText: { fontSize: 13, color: MUTED },
    resendLink: { color: TEAL, fontWeight: '600' },

    // Footer
    footer: {
        paddingHorizontal: 24,
        paddingBottom: Platform.OS === 'ios' ? 16 : 24,
        paddingTop: 12,
        backgroundColor: BG,
    },
    saveButton: {
        height: 54, borderRadius: 50,
        backgroundColor: DARK,
        alignItems: 'center', justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF', fontSize: 16,
        fontWeight: '600', letterSpacing: 0.3,
    },
});