const supabase = require('../utils/supabase');
const { TABLES } = require('../models');

const getAllApplications = async (req, res) => {
    try {
        const { status } = req.query;
        
        console.log('Fetching applications...');
        
        let query = supabase
            .from(TABLES.APPLICATIONS)
            .select(`
                *,
                students:student_id (
                    id,
                    name,
                    registration_number,
                    email,
                    program,
                    year
                ),
                companies:company_id (
                    id,
                    name,
                    industry,
                    location
                )
            `)
            .order('created_at', { ascending: false });
        
        if (status) {
            query = query.eq('status', status);
        }
        
        const { data, error } = await query;
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch applications',
                error: error.message
            });
        }
        
        console.log(`Found ${data.length} applications`);
        
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching application with ID: ${id}`);
        
        const { data, error } = await supabase
            .from(TABLES.APPLICATIONS)
            .select(`
                *,
                students:student_id (
                    id,
                    name,
                    registration_number,
                    email,
                    program,
                    year,
                    cgpa
                ),
                companies:company_id (
                    id,
                    name,
                    industry,
                    location,
                    job_roles,
                    stipend_min,
                    stipend_max
                )
            `)
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(404).json({
                success: false,
                message: 'Application not found',
                error: error.message
            });
        }
        
        console.log(`Found application`);
        
        return res.status(200).json({
            success: true,
            data: data
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const createApplication = async (req, res) => {
    try {
        const applicationData = req.body;
        
        console.log('Creating new application');
        
        const requiredFields = ['student_id', 'company_id'];
        
        for (const field of requiredFields) {
            if (!applicationData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }
        
        const { data, error } = await supabase
            .from(TABLES.APPLICATIONS)
            .insert([{
                student_id: applicationData.student_id,
                company_id: applicationData.company_id,
                status: 'pending',
                applied_date: new Date().toISOString(),
                comments: applicationData.comments || null
            }])
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create application',
                error: error.message
            });
        }
        
        console.log(`Application created successfully`);
        
        return res.status(201).json({
            success: true,
            message: 'Application created successfully',
            data: data[0]
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, comments, reviewed_by } = req.body;
        
        console.log(`Updating application ID: ${id} to status: ${status}`);
        
        if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be: pending, approved, or rejected'
            });
        }
        
        const updateData = {
            status: status,
            review_date: new Date().toISOString(),
            comments: comments || null
        };
        
        if (reviewed_by) {
            updateData.reviewed_by = reviewed_by;
        }
        
        const { data, error } = await supabase
            .from(TABLES.APPLICATIONS)
            .update(updateData)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update application',
                error: error.message
            });
        }
        
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }
        
        console.log(`Application status updated successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Application status updated successfully',
            data: data[0]
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log(`Deleting application ID: ${id}`);
        
        const { error } = await supabase
            .from(TABLES.APPLICATIONS)
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete application',
                error: error.message
            });
        }
        
        console.log(`Application deleted successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
        
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplicationStatus,
    deleteApplication
};
