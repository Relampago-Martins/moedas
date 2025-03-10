import { StepObject } from "@/entities/stepper/lib/types";


export interface StepNode<T = string> {
    step: StepObject<T>;
    parent: StepNode<T> | null;
    children: Map<string, StepNode<T>>;
}

/**
 * Manages a navigation tree structure for multi-step workflows
 * Maintains parent-child relationships between steps
 */
export class StepNavigationTree<T = string> {
    private root: StepNode<T>;
    private currentNode: StepNode<T>;

    constructor(initialStep: StepObject<T>) {
        this.root = {
            step: initialStep,
            parent: null,
            children: new Map(),
        };
        this.currentNode = this.root;
    }

    /**
     * Gets the current step in the navigation
     */
    getCurrentStep(): StepObject<T> {
        return this.currentNode.step;
    }

    /**
     * Gets the parent step of the current step (if any)
     * Returns null if at the root of the tree
     */
    getParentStep(): StepObject<T> | null {
        return this.currentNode.parent?.step || null;
    }

    /**
     * Navigate to a specific step
     * Will update the tree structure accordingly
     * 
     * Possiveis problemas:
     * - Só pode avançar um nível por vez 
     *      - mais que isso ele cria um nodo no nivel errado
     * - Um nodo não pode ter ter dois parents 
     *      - se tentar ele cria um nodo com valor duplicado
     */
    navigateTo(step: StepObject<T>): void {
        const stepName = String(step.name);

        // Case 1: Navigating to parent
        if (this.currentNode.parent && 
            String(this.currentNode.parent.step.name) === stepName) {
            this.currentNode = this.currentNode.parent;
            return;
        }

        // Case 2: Navigating to existing child
        if (this.currentNode.children.has(stepName)) {
            this.currentNode = this.currentNode.children.get(stepName)!;
            return;
        }

        // Case 3: Creating new path
        const newNode: StepNode<T> = {
            step,
            parent: this.currentNode,
            children: new Map(),
        };

        this.currentNode.children.set(stepName, newNode);
        this.currentNode = newNode;
    }

    /**
     * Navigate back to parent step
     * Returns true if successful, false if already at root
     */
    navigateBack(): boolean {
        if (!this.currentNode.parent) {
            return false;
        }
        
        this.currentNode = this.currentNode.parent;
        return true;
    }

    /**
     * Reset the navigation to the root step
     */
    reset(): void {
        this.currentNode = this.root;
    }

    /**
     * Check if the step is a possible destination from current position
     */
    canNavigateTo(stepName: string): boolean {
        // Can navigate to parent
        if (this.currentNode.parent && 
            String(this.currentNode.parent.step.name) === stepName) {
            return true;
        }

        // Can navigate to existing child
        return this.currentNode.children.has(stepName);
    }


    hasPrevious(): boolean {
        return !!this.currentNode.parent;
    }
}