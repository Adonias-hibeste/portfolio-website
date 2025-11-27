// Script to verify DATABASE_URL is properly set
const dbUrl = process.env.DATABASE_URL;

console.log('=== Environment Variable Check ===');
console.log('DATABASE_URL exists:', !!dbUrl);
if (dbUrl) {
    console.log('DATABASE_URL starts with:', dbUrl.substring(0, 15));
    console.log('DATABASE_URL length:', dbUrl.length);
    console.log('First char code:', dbUrl.charCodeAt(0));
    console.log('Has quotes:', dbUrl.startsWith('"') || dbUrl.startsWith("'"));
} else {
    console.log('DATABASE_URL is not set!');
    process.exit(1);
}

// Check if it starts with the correct protocol
if (!dbUrl.startsWith('postgres://') && !dbUrl.startsWith('postgresql://')) {
    console.error('ERROR: DATABASE_URL does not start with postgres:// or postgresql://');
    console.error('Actual start:', dbUrl.substring(0, 20));
    process.exit(1);
}

console.log('✓ DATABASE_URL is properly formatted');
