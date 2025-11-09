const supabase = require('../utils/supabase');
const { TABLES } = require('../models');

const getAllCompanies = async (req, res) => {
    try {
        console.log('Fetching all companies...');
        
        const { data, error } = await supabase
            .from(TABLES.COMPANIES)
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch companies',
                error: error.message
            });
        }
        
        console.log(`Found ${data.length} companies`);
        
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

const getCompanyById = async (req, res) => {
    try {
        const { id} = req.params;
        console.log(`Fetching company with ID: ${id}`);
        
        const { data, error } = await supabase
            .from(TABLES.COMPANIES)
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(404).json({
                success: false,
                message: 'Company not found',
                error: error.message
            });
        }
        
        console.log(`Found company: ${data.name}`);
        
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

const createCompany = async (req, res) => {
    try {
        const companyData = req.body;
        
        console.log('Creating new company:', companyData.name);
        
        const requiredFields = [
            'name', 'industry', 'location', 'contact_person',
            'contact_email', 'contact_phone', 'positions_available',
            'job_roles', 'stipend_min', 'stipend_max', 'duration',
            'application_deadline'
        ];
        
        for (const field of requiredFields) {
            if (!companyData[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required field: ${field}`
                });
            }
        }
        
        const { data, error } = await supabase
            .from(TABLES.COMPANIES)
            .insert([{
                name: companyData.name,
                industry: companyData.industry,
                location: companyData.location,
                website: companyData.website || null,
                contact_person: companyData.contact_person,
                contact_email: companyData.contact_email,
                contact_phone: companyData.contact_phone,
                positions_available: parseInt(companyData.positions_available),
                job_roles: companyData.job_roles,
                stipend_min: parseInt(companyData.stipend_min),
                stipend_max: parseInt(companyData.stipend_max),
                duration: companyData.duration,
                requirements: companyData.requirements || null,
                description: companyData.description || null,
                application_deadline: companyData.application_deadline
            }])
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create company',
                error: error.message
            });
        }
        
        console.log(`Company created successfully: ${data[0].name}`);
        
        return res.status(201).json({
            success: true,
            message: 'Company created successfully',
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

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        console.log(`Updating company ID: ${id}`);
        
        const { data, error } = await supabase
            .from(TABLES.COMPANIES)
            .update(updateData)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update company',
                error: error.message
            });
        }
        
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
        
        console.log(`Company updated successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Company updated successfully',
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

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log(`Deleting company ID: ${id}`);
        
        const { error } = await supabase
            .from(TABLES.COMPANIES)
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete company',
                error: error.message
            });
        }
        
        console.log(`Company deleted successfully`);
        
        return res.status(200).json({
            success: true,
            message: 'Company deleted successfully'
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
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};
