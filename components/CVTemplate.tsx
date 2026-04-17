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
    
    // Experience & Projects
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 2,
    },
    itemTitleBlock: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#000000",
    },
    itemSubtitle: {
        fontSize: 10,
        fontStyle: "italic",
        color: "#333333",
    },
    itemDateLocation: {
        fontSize: 10,
        color: "#333333",
        textAlign: "right",
    },
    bulletContainer: {
        flexDirection: "row",
        marginBottom: 3,
        paddingLeft: 8,
    },
    bulletPoint: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        lineHeight: 1.4,
        color: "#333333",
    },
    itemWrapper: {
        marginBottom: 10,
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
    projects: {
        title: string;
        description: string;
        technologies: string[];
        liveLink?: string;
        githubLink?: string;
    }[];
    experiences: {
        position: string;
        company: string;
        location?: string;
        startDate: string;
        endDate?: string;
        current: boolean;
        description: string;
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
    
    if (data.location) contactItems.push(<Text key="loc">{data.location}</Text>);
    if (data.phone) contactItems.push(<Text key="phone">{data.phone}</Text>);
    if (data.email) contactItems.push(
        <Link src={`mailto:${data.email}`} style={styles.contactLink} key="email">
            {data.email}
        </Link>
    );
    if (data.linkedin) contactItems.push(
        <Link src={data.linkedin} style={styles.contactLink} key="ln">
            {data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/')}
        </Link>
    );
    if (data.github) contactItems.push(
        <Link src={data.github} style={styles.contactLink} key="gh">
            {data.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}
        </Link>
    );
    if (data.website) contactItems.push(
        <Link src={data.website} style={styles.contactLink} key="web">
            {data.website.replace(/^https?:\/\//, '')}
        </Link>
    );

    // Render contact line with separators
    const renderedContact = contactItems.map((item, index) => (
        <View style={{ flexDirection: "row" }} key={index}>
            {item}
            {index < contactItems.length - 1 && <Text style={styles.separator}> | </Text>}
        </View>
    ));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                
                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <Text style={styles.headerName}>{data.name}</Text>
                    <View style={styles.headerContact}>
                        {renderedContact}
                    </View>
                </View>

                {/* --- SUMMARY --- */}
                {data.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.bodyText}>{data.summary}</Text>
                    </View>
                )}

                {/* --- SKILLS --- */}
                {data.skills && data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsContainer}>
                            <Text style={styles.skillsText}>
                                {data.skills.map(s => s.name).join(' • ')}
                            </Text>
                        </View>
                    </View>
                )}

                {/* --- EXPERIENCE --- */}
                {data.experiences && data.experiences.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.experiences.map((exp, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={styles.itemTitle}>{exp.position}</Text>
                                        <Text style={styles.itemSubtitle}>{exp.company}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemDateLocation}>
                                            {formatMonthYear(exp.startDate)} – {exp.current ? "Present" : formatMonthYear(exp.endDate!)}
                                        </Text>
                                        {exp.location && <Text style={styles.itemDateLocation}>{exp.location}</Text>}
                                    </View>
                                </View>
                                <View>
                                    {exp.description.split('\n').map((line, i) => {
                                        const cleanLine = line.trim().replace(/^[-•]\s*/, ""); // remove existing bullets if any
                                        return cleanLine ? (
                                            <View key={i} style={styles.bulletContainer}>
                                                <Text style={styles.bulletPoint}>•</Text>
                                                <Text style={styles.bulletText}>{cleanLine}</Text>
                                            </View>
                                        ) : null;
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* --- PROJECTS --- */}
                {data.projects && data.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {data.projects.map((project, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={styles.itemTitle}>
                                            {project.title}
                                            {project.liveLink && (
                                                <Link src={project.liveLink} style={styles.contactLink}> (Live)</Link>
                                            )}
                                        </Text>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <Text style={styles.itemSubtitle}>
                                                Technologies: {Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View>
                                    {project.description.split('\n').map((line, i) => {
                                        const cleanLine = line.trim().replace(/^[-•]\s*/, "");
                                        return cleanLine ? (
                                            <View key={i} style={styles.bulletContainer}>
                                                <Text style={styles.bulletPoint}>•</Text>
                                                <Text style={styles.bulletText}>{cleanLine}</Text>
                                            </View>
                                        ) : null;
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* --- EDUCATION --- */}
                {data.educations && data.educations.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.educations.map((edu, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemTitleBlock}>
                                        <Text style={styles.itemTitle}>{edu.institution}</Text>
                                        <Text style={styles.itemSubtitle}>{edu.degree} in {edu.field}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.itemDateLocation}>
                                            {new Date(edu.startDate).getFullYear()} – {edu.current ? "Present" : new Date(edu.endDate!).getFullYear()}
                                        </Text>
                                        {edu.location && <Text style={styles.itemDateLocation}>{edu.location}</Text>}
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
