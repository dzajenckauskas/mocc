// components/pdf/ProductDiagnosesTablePDF.tsx
import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import type { ProductViewData } from '../pages/ProductViewPage.types'
import { theme } from '../theme'

type Props = {
    diagnoses: ProductViewData['diagnosesTable']
}



const styles = StyleSheet.create({
    root: {
        marginTop: 20,
        flexDirection: 'column',
        // borderWidth: 1,
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid',
        color: theme.palette.secondary.main,
    },

    // header: "KOMPENSUOJAMA X%"
    percentBar: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: theme.palette.primary.main,
    },
    percentText: {
        color: '#fff',
        fontSize: 10, // smaller
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    // table header
    sectionHeaderRow: {
        flexDirection: 'row',
        backgroundColor: theme.palette.grey[200],
        borderTopWidth: 0,
        borderTopColor: theme.palette.primary.main,
        borderTopStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.primary.main,
        borderBottomStyle: 'solid',
    },
    sectionHeaderLeft: {
        width: '50%',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.primary.main,
        borderRightWidth: 1,
        borderRightColor: theme.palette.primary.main,
        borderRightStyle: 'solid',
        // borderTopWidth: 1,
        // borderTopColor: theme.palette.primary.main,
        // borderTopStyle: 'solid',
    },
    sectionHeaderRight: {
        width: '50%',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRightWidth: 1,
        borderRightColor: theme.palette.primary.main,
        borderRightStyle: 'solid',
        // borderTopWidth: 1,
        // borderTopColor: theme.palette.primary.main,
        // borderTopStyle: 'solid',
    },
    sectionHeaderText: {
        color: theme.palette.primary.main,
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
    },

    // body row (two columns)
    bodyRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderTopColor: theme.palette.primary.main,
        borderTopStyle: 'solid',
        // ensure visible borders even when the table continues on next page
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.primary.main,
        borderLeftWidth: 0,
        borderLeftColor: theme.palette.primary.main,
        borderRightWidth: 0,
        borderRightColor: theme.palette.primary.main,
    },

    // left column = list of diagnoses rows
    leftCol: {
        width: '50%',
        borderRightWidth: 1,
        borderRightColor: theme.palette.primary.main,
        borderRightStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: theme.palette.primary.main,
        borderLeftStyle: 'solid'
    },
    leftItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderBottomWidth: 0.75,
        borderBottomColor: theme.palette.primary.main,
        borderBottomStyle: 'solid',
    },
    leftItemText: {
        fontSize: 9,
        textAlign: 'left',
    },

    // right column = single big cell (specialists)
    rightCol: {
        width: '50%',
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: theme.palette.primary.main,
        borderRightStyle: 'solid',
    },
    rightColText: {
        fontSize: 9,
        // lineHeight: 1.35,
        textAlign: 'center',
    },

    groupWrap: {
        // spacing between groups
    },
})

const ProductDiagnosesTablePDF = ({ diagnoses }: Props) => {
    if (!diagnoses || (Array.isArray(diagnoses) && diagnoses.length === 0)) return null

    const groups = Array.isArray(diagnoses) ? diagnoses : []

    // chunk helper to avoid splitting body rows awkwardly across pages
    function chunkArray<T>(arr: T[], size: number): T[][] {
        const out: T[][] = []
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
        return out
    }

    return (
        <View style={styles.root}>
            {groups.map((group: any, index: number) => {
                const showPercentHeader = index === 0 || groups[index - 1]?.percent !== groups[index]?.percent
                const items = Array.isArray(group?.diagnoses) ? group.diagnoses : []
                const chunks = chunkArray(items, 4) // even smaller chunks to better fit pages

                return (
                    <View key={group.id} wrap={false} style={styles.groupWrap}>
                        {chunks.map((part, partIdx) => (
                            <View key={`${group.id}-${partIdx}`} minPresenceAhead={260} {...(partIdx > 0 ? { break: true } : {})}>
                                {(showPercentHeader && partIdx === 0) && (
                                    <>
                                        <View style={styles.percentBar} wrap={false} minPresenceAhead={240}>
                                            <Text style={styles.percentText}>
                                                {'KOMPENSUOJAMA '}{group.percent}{'%'}
                                            </Text>
                                        </View>
                                    </>
                                )}

                                {/* Repeat table header for each chunk */}
                                <View style={styles.sectionHeaderRow} wrap={false} minPresenceAhead={220}>
                                    <View style={styles.sectionHeaderLeft}>
                                        <Text style={styles.sectionHeaderText}>DIAGNOZĖS</Text>
                                    </View>
                                    <View style={styles.sectionHeaderRight}>
                                        <Text style={styles.sectionHeaderText}>GYDYTOJAI</Text>
                                    </View>
                                </View>

                                {/* Body chunk: keep chunk atomic */}
                                <View style={styles.bodyRow} wrap={false} minPresenceAhead={200}>
                                    <View style={styles.leftCol}>
                                        {part.map((d: any, i: number) => (
                                            <View key={d.id ?? i} wrap={false} style={[
                                                styles.leftItemRow,
                                                { borderBottomWidth: i === part.length - 1 ? 0 : 0.75 }
                                            ]}>
                                                <Text style={styles.leftItemText}>{d?.diagnose}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <View style={styles.rightCol}>
                                        <Text style={styles.rightColText}>{group?.specialists}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )
            })}
        </View>
    )
}

export default ProductDiagnosesTablePDF
