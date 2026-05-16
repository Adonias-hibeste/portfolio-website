import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
        paddingTop: 35,
        paddingBottom: 35,
        paddingLeft: 40,
        paddingRight: 40,
    },
    // Header Styles
    header: {
        marginBottom: 15,
        textAlign: "center",
    },
    headerName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 4,
        textTransform: "uppercase",
    },
    headerContact: {
        fontSize: 10,
        color: "#333333",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 4,
    },
    contactLink: {
        color: "#333333",
        textDecoration: "none",
    },
    separator: {
        marginHorizontal: 4,
    },
    
    // Core Structural Styles
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#000000",
        borderBottomWidth: 1,
        borderBottomColor: "#000000",
        paddingBottom: 2,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    bodyText: {
        fontSize: 10,
        color: "#000000",
        lineHeight: 1.5,
    },
    
    // Skills
    skillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    skillsText: {
        fontSize: 10,
        color: "#000000",
        lineHeight: 1.5,
    },
    
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 3,
    },
    itemTitleBlock: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 1,
    },
    itemSubtitle: {
        fontSize: 11,
        fontStyle: "italic",
        color: "#222222",
    },
    itemDateLocation: {
        fontSize: 10,
        color: "#444444",
        textAlign: "right",
        marginBottom: 1,
    },
    bulletContainer: {
        flexDirection: "row",
        marginBottom: 4,
        paddingLeft: 8,
    },
    bulletPoint: {
        width: 12,
        fontSize: 10,
        color: "#444444",
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        lineHeight: 1.4,
        color: "#222222",
    },
    itemWrapper: {
        marginBottom: 10,
    },
    paragraphText: {
        fontSize: 10,
        lineHeight: 1.4,
        color: "#222222",
        textAlign: "justify",
    }
});

interface CVData {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    website?: string | null;
    github?: string | null;
    linkedin?: string | null;
    telegram?: string | null;
    skills: { name: string }[];
    experiences: {
        position: string;
        company: string;
        location?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description: string;
        subItems?: { title: string; description: string }[];
    }[];
    educations: {
        institution: string;
        degree: string;
        field: string;
        location?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description?: string;
    }[];
}

export const CVTemplate = ({ data }: { data: CVData }) => {
    const formatMonthYear = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    // Construct the contact line array safely
    const contactItems: React.ReactNode[] = [];
    
    if (data.location) {
        contactItems.push(<Text key="loc">{data.location}</Text>);
    }
    if (data.phone) {
        contactItems.push(<Text key="phone">{data.phone}</Text>);
    }
    if (data.email) {
        contactItems.push(
            <Link src={`mailto:${data.email}`} style={styles.contactLink} key="email">
                {data.email}
            </Link>
        );
    }
    
    // Ensure Portfolio website is included and labeled professionally
    if (data.website) {
        const cleanWeb = data.website.replace(/^https?:\/\//, '');
        contactItems.push(
            <Link src={data.website} style={styles.contactLink} key="web">
                Portfolio: {cleanWeb}
            </Link>
        );
    }

    // Render contact line with professional separators
    const renderedContact = contactItems.map((item, index) => (
        <View style={{ flexDirection: "row", alignItems: "center" }} key={index}>
            {item}
            {index < contactItems.length - 1 && (
                <Text style={[styles.separator, { color: "#999999", marginHorizontal: 8 }]}>•</Text>
            )}
        </View>
    ));    return (
        <Document title={`${data.name} - CV`}>
            <Page size="A4" style={[styles.page, { paddingVertical: 25, paddingHorizontal: 35 }]}>
                
                {/* --- HEADER --- */}
                <View style={[styles.header, { marginBottom: 12 }]}>
                    <Text style={[styles.headerName, { fontSize: 22 }]}>{data.name}</Text>
                    <View style={styles.headerContact}>
                        {renderedContact}
                    </View>
                </View>

                {/* --- SUMMARY --- */}
                {data.summary && (
                    <View style={[styles.section, { marginBottom: 10 }]}>
                        <Text style={[styles.sectionTitle, { fontSize: 11, marginBottom: 5 }]}>Professional Summary</Text>
                        <Text style={[styles.bodyText, { fontSize: 9.5, textAlign: "justify" }]}>{data.summary}</Text>
                    </View>
                )}

                {/* --- EXPERIENCE --- */}
                {data.experiences && data.experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { fontSize: 11, marginBottom: 6 }]}>Professional Experience</Text>
                        {data.experiences.map((exp, index) => (
                            <View key={index} style={[styles.itemWrapper, { marginBottom: 8 }]}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={[styles.itemTitle, { fontSize: 11 }]}>{exp.company}</Text>
                                        <Text style={[styles.itemSubtitle, { fontSize: 10 }]}>{exp.position}</Text>
                                    </View>
                                    <View>
                                        {exp.location && <Text style={[styles.itemDateLocation, { fontSize: 9 }]}>{exp.location}</Text>}
                                        <Text style={[styles.itemDateLocation, { fontSize: 9 }]}>
                                            {formatMonthYear(exp.startDate)} – {exp.current ? "Present" : formatMonthYear(exp.endDate!)}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.paragraphText, { fontSize: 9.5, lineHeight: 1.3 }]}>{exp.description}</Text>
                                    {exp.subItems && exp.subItems.length > 0 && (
                                        <View style={{ marginTop: 4, paddingLeft: 8 }}>
                                            {exp.subItems.map((item, idx) => (
                                                <View key={idx} style={{ marginBottom: 3 }}>
                                                    <Text style={{ fontSize: 9, fontWeight: "bold", color: "#000000" }}>• {item.title}</Text>
                                                    <Text style={[styles.paragraphText, { color: "#444444", fontSize: 8.5, lineHeight: 1.2 }]}>{item.description}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* --- EDUCATION --- */}
                {data.educations && data.educations.length > 0 && (
                    <View style={[styles.section, { marginTop: 4 }]}>
                        <Text style={[styles.sectionTitle, { fontSize: 11, marginBottom: 5 }]}>Education</Text>
                        {data.educations.map((edu, index) => (
                            <View key={index} style={[styles.itemWrapper, { marginBottom: 4 }]}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={[styles.itemTitle, { fontSize: 10 }]}>{edu.institution}</Text>
                                        <Text style={[styles.itemSubtitle, { fontSize: 9 }]}>{edu.degree} in {edu.field}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.itemDateLocation, { fontSize: 9 }]}>
                                            {new Date(edu.startDate).getFullYear()} – {edu.current ? "Present" : new Date(edu.endDate!).getFullYear()}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

            </Page>
        </Document>
    );
};
