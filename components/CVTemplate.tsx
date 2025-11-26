import { Document, Page, Text, View, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
    },
    leftColumn: {
        width: "65%",
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 20,
    },
    rightColumn: {
        width: "35%",
        backgroundColor: "#F4F4F4",
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 30,
    },
    // Header Styles
    headerName: {
        fontSize: 36,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#222222",
        marginBottom: 5,
    },
    headerTitle: {
        fontSize: 18, // Increased from 14
        fontWeight: "bold",
        color: "#A93226",
        marginBottom: 15,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    contactGrid: {
        flexDirection: "column",
        marginBottom: 25,
        gap: 6,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
    },
    contactIcon: {
        marginRight: 8,
        width: 12,
        height: 12,
    },
    contactText: {
        fontSize: 9,
        color: "#444",
        textDecoration: "none",
    },
    // Section Styles
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#222",
        borderBottomWidth: 2,
        borderBottomColor: "#A93226",
        marginBottom: 12,
        marginTop: 20,
        paddingBottom: 3,
        letterSpacing: 1,
    },
    // Experience Styles
    expItem: {
        marginBottom: 15,
    },
    expPosition: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#222",
    },
    expCompany: {
        fontSize: 10,
        color: "#A93226",
        fontWeight: "bold",
        marginBottom: 2,
    },
    expMetaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    expDate: {
        fontSize: 9,
        color: "#666",
        fontStyle: "italic",
    },
    expLocation: {
        fontSize: 9,
        color: "#666",
    },
    bulletPoint: {
        flexDirection: "row",
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 9,
        color: "#444",
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
        color: "#444",
        lineHeight: 1.4,
    },
    // Right Column Styles
    sidebarSectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#222",
        borderBottomWidth: 2,
        borderBottomColor: "#A93226",
        marginBottom: 12,
        marginTop: 20,
        paddingBottom: 3,
        letterSpacing: 1,
    },
    objectiveText: {
        fontSize: 9,
        lineHeight: 1.5,
        color: "#444",
        marginBottom: 20,
    },
    eduItem: {
        marginBottom: 15,
    },
    eduDegree: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#222",
    },
    eduField: {
        fontSize: 10,
        color: "#444",
    },
    eduSchool: {
        fontSize: 10,
        color: "#A93226",
        fontWeight: "bold",
        marginBottom: 2,
    },
    eduDate: {
        fontSize: 9,
        color: "#666",
        marginBottom: 2,
    },
    skillItem: {
        marginBottom: 4,
    },
    skillText: {
        fontSize: 9,
        color: "#444",
        fontWeight: "medium",
    },
    socialItem: {
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    socialLink: {
        fontSize: 9,
        color: "#A93226",
        textDecoration: "none",
    },
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

// Icon Components
const EmailIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
            fill="#A93226"
        />
    </Svg>
);

const PhoneIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
            fill="#A93226"
        />
    </Svg>
);

const LocationIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="#A93226"
        />
    </Svg>
);

const WebsiteIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
            fill="#A93226"
        />
    </Svg>
);

const LinkedInIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
            fill="#A93226"
        />
    </Svg>
);

const GitHubIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
            fill="#A93226"
        />
    </Svg>
);

const TelegramIcon = () => (
    <Svg style={styles.contactIcon} viewBox="0 0 24 24">
        <Path
            d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"
            fill="#A93226"
        />
    </Svg>
);

export const CVTemplate = ({ data }: { data: CVData }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    const formatYear = (dateString: string) => {
        const date = new Date(dateString);
        return date.getFullYear().toString();
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Left Column (Main Content) */}
                <View style={styles.leftColumn}>
                    {/* Header */}
                    <View>
                        <Text style={styles.headerName}>{data.name}</Text>
                        <Text style={styles.headerTitle}>{data.title}</Text>

                        <View style={styles.contactGrid}>
                            <View style={styles.contactItem}>
                                <EmailIcon />
                                <Link src={`mailto:${data.email}`} style={styles.contactText}>
                                    {data.email}
                                </Link>
                            </View>
                            <View style={styles.contactItem}>
                                <PhoneIcon />
                                <Text style={styles.contactText}>{data.phone}</Text>
                            </View>
                            <View style={styles.contactItem}>
                                <LocationIcon />
                                <Text style={styles.contactText}>{data.location}</Text>
                            </View>
                            {data.website && (
                                <View style={styles.contactItem}>
                                    <WebsiteIcon />
                                    <Link src={data.website} style={styles.contactText}>
                                        {data.website.replace(/^https?:\/\//, '')}
                                    </Link>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Career Objective */}
                    <View>
                        <Text style={styles.sectionTitle}>CAREER OBJECTIVE</Text>
                        <Text style={styles.objectiveText}>{data.summary}</Text>
                    </View>

                    {/* Work Experience */}
                    <View>
                        <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
                        {data.experiences.map((exp, index) => (
                            <View key={index} style={styles.expItem}>
                                <Text style={styles.expPosition}>{exp.position}</Text>
                                <Text style={styles.expCompany}>{exp.company}</Text>
                                <View style={styles.expMetaRow}>
                                    <Text style={styles.expDate}>
                                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate!)}
                                    </Text>
                                    <Text style={styles.expLocation}>{exp.location}</Text>
                                </View>
                                <View>
                                    {exp.description.split('\n').map((line, i) => (
                                        line.trim() && (
                                            <View key={i} style={styles.bulletPoint}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.bulletText}>{line.trim()}</Text>
                                            </View>
                                        )
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Projects */}
                    <View>
                        <Text style={styles.sectionTitle}>PROJECTS</Text>
                        {data.projects.map((project, index) => (
                            <View key={index} style={styles.expItem}>
                                <Text style={styles.expPosition}>{project.title}</Text>
                                <Text style={styles.expCompany}>Creator</Text>
                                <View>
                                    {project.description.split('\n').map((line, i) => (
                                        line.trim() && (
                                            <View key={i} style={styles.bulletPoint}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={styles.bulletText}>{line.trim()}</Text>
                                            </View>
                                        )
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Right Column (Sidebar) */}
                <View style={styles.rightColumn}>
                    {/* Education */}
                    <View>
                        <Text style={styles.sidebarSectionTitle}>EDUCATION</Text>
                        {data.educations.map((edu, index) => (
                            <View key={index} style={styles.eduItem}>
                                <Text style={styles.eduDegree}>{edu.degree}</Text>
                                <Text style={styles.eduField}>{edu.field}</Text>
                                <Text style={styles.eduSchool}>{edu.institution}</Text>
                                <Text style={styles.eduDate}>
                                    {formatYear(edu.startDate)} - {edu.current ? "Present" : formatYear(edu.endDate!)}
                                </Text>
                                <Text style={styles.expLocation}>{edu.location}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Skills */}
                    <View>
                        <Text style={styles.sidebarSectionTitle}>SKILLS</Text>
                        {data.skills.map((skill, index) => (
                            <View key={index} style={styles.skillItem}>
                                <Text style={styles.skillText}>• {skill.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Social Media */}
                    {(data.github || data.linkedin || data.telegram) && (
                        <View>
                            <Text style={styles.sidebarSectionTitle}>SOCIAL</Text>
                            {data.linkedin && (
                                <View style={styles.socialItem}>
                                    <LinkedInIcon />
                                    <Link src={data.linkedin} style={styles.socialLink}>
                                        LinkedIn
                                    </Link>
                                </View>
                            )}
                            {data.github && (
                                <View style={styles.socialItem}>
                                    <GitHubIcon />
                                    <Link src={data.github} style={styles.socialLink}>
                                        GitHub
                                    </Link>
                                </View>
                            )}
                            {data.telegram && (
                                <View style={styles.socialItem}>
                                    <TelegramIcon />
                                    <Link src={`https://t.me/${data.telegram.replace('@', '')}`} style={styles.socialLink}>
                                        Telegram
                                    </Link>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
